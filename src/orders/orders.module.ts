import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from '../restaurants/entities/dish.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { OrderItem } from './dtos/order-item.entity';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Restaurant, Dish])],
  providers: [OrderService, OrderResolver]
})
export class OrdersModule { }