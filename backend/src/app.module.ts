import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// TODO: Import your modules here
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// import { ProductsModule } from './modules/products/products.module';
// import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/subscription-challenge'),
    
    // TODO: Add your modules here
    // AuthModule,
    // UsersModule,
    // ProductsModule,
    // SubscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
