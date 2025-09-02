import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthResponseDto, RefreshResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

   @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    return this.userService.login(dto)
  }

  @Post("signup")
  async signup(@Body() dto: SignupDto): Promise<AuthResponseDto> {
    return this.userService.signup(dto)
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Body() dto: RefreshTokenDto): Promise<RefreshResponseDto> {
    return this.userService.refreshTokens(dto)
  }
}
