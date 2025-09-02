import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from './entity/user.entity';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { AuthResponseDto, RefreshResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModel>,
    private jwtService: JwtService
  ) {}

  async findById(_id: string) {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!user || !(await user.validatePassword(dto.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    return {
      ...tokens,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userModel.create(dto);
      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

      return {
        ...tokens,
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async refreshTokens(dto: RefreshTokenDto): Promise<RefreshResponseDto> {
    try {
      const payload = this.jwtService.verify(dto.refreshToken);
      const user = await this.userModel
        .findById(payload.sub)
        .select('+refreshToken');

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isRefreshTokenValid = await bcrypt.compare(
        dto.refreshToken,
        user.refreshToken
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $unset: { refreshToken: 1 },
    });
  }

  private async generateTokens(user: UserModel): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}
