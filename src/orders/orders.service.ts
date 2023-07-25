import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dish } from '../restaurants/entities/dish.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderItem } from './dtos/order-item.entity';
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>
  ) { }

  async createOrder(customer: User, { restaurantId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
    const restaurant = await this.restaurants.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      return {
        ok: false,
        error: 'Restaurant not found'
      }
    }
    items.forEach(async item => {
      const dish = await this.dishes.findOne({ where: { id: restaurantId } });
      if (!dish) {

      }
      await this.orderItems.save(this.orderItems.create({ dish, options: item.options }))
    })
  }
}