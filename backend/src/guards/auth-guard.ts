import { UserService } from '@/modules/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const header: string = req.headers.authorization ?? 'some token';
    const token = header.split(' ')[1].toString();

    try {
      const user = await this.jwtService.verify(token);
      if (!user) throw new UnauthorizedException();

      const dbUser = await this.userService.findById(user.sub);

      req['user'] = dbUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  catch(error) {
    throw new UnauthorizedException();
  }
}
