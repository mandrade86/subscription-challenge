import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET', 'some-secret'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    UserModule,
  ],
  exports: [JwtModule, UserModule],
})
export class CommonModule {}
