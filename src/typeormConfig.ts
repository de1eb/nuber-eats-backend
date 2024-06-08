import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import { OrderItem } from "./orders/entities/order-item.entity";
import { Order } from "./orders/entities/order.entity";
import { Payment } from "./payments/entities/payment.entity";
import { Category } from "./restaurants/entities/category.entity";
import { Dish } from "./restaurants/entities/dish.entity";
import { Restaurant } from "./restaurants/entities/restaurant.entity";
import { User } from "./users/entities/user.entity";
import { Verification } from "./users/entities/verification.entity";

export const typeorm_config_prod: (...args: any[]) => TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: false,
  logging: false,
  entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
  ssl: {
    ca: fs.readFileSync('ap-northeast-2-bundle.pem')
  }
})

export const typeorm_config_dev: (...args: any[]) => TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: true,
  logging: true,
  entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
  ssl: false,
})

export const typeorm_config_test: (...args: any[]) => TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: true,
  logging: false,
  entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
  ssl: false
})