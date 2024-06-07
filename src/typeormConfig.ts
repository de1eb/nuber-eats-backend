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

export const typeorm_config_prod: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: '' + process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
  ssl: {
    ca: fs.readFileSync('ap-northeast-2-bundle.pem')
  }
}

export const typeorm_config_dev: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: '' + process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
  ssl: false,
}

export const typeorm_config_test: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
  ssl: false
}