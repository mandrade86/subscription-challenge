import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// TODO: Import your modules here
// import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MONGO_INITDB_ROOT_USERNAME: admin
    // MONGO_INITDB_ROOT_PASSWORD: password
    // MONGO_INITDB_DATABASE: subscription-challenge
    // Prefer env var when it includes credentials; otherwise, fall back to authenticated local Docker Mongo
    MongooseModule.forRoot((() => {
      const envUri = process.env.MONGODB_URI;
      const hasCreds = typeof envUri === 'string' && envUri.includes('@');
      const hasAuthSource = typeof envUri === 'string' && /[?&]authSource=/.test(envUri);
      if (hasCreds && hasAuthSource) return envUri as string;
      return 'mongodb://admin:password@localhost:27017/subscription-challenge?authSource=admin';
    })()),
    ProductsModule,
    UsersModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
