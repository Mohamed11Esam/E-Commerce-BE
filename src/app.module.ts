import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from './shared';

@Module({
  imports: [ConfigModule.forRoot({
    load: [devConfig],
    isGlobal: true,
  }),MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('db').url,
    }),
  }),UserMongoModule,AuthModule, BrandModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
