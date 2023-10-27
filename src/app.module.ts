import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './offers/offers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/utils/config/config.db';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { OffersController } from './offers/offers.controller';
import { OffersService } from './offers/offers.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.dbHost,
      port: 3306,
      username: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase,
      entities: ['dist/**/**.entity{.ts,.js}'],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    OffersModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, OffersController],
  providers: [AppService, UserService, OffersService],
})
export class AppModule {}
