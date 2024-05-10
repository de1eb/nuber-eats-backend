import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { Restaurant } from "../restaurants/entities/restaurant.entity";
import { User } from "../users/entities/user.entity";
import { CreatePaymentInput, CreatePaymentOutput } from "./dtos/create-payments.dto";
import { GetPaymentsOutput } from "./dtos/get-payments.dto";
import { Payment } from "./entities/payment.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private schedulerRegistry: SchedulerRegistry
  ) { }

  async createPayment(owner: User, { transactionId, restaurantId }: CreatePaymentInput): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOne({ where: { id: restaurantId } });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not foud'
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'You are not allowed to do this.'
        };
      }
      await this.payments.save(this.payments.create({ transactionId, user: owner, restaurant }));
      restaurant.isPromoted = true;
      const date = new Date();
      date.setDate(date.getDate() + 7);
      restaurant.promotedUntil = date;
      this.restaurants.save(restaurant);
      return {
        ok: true
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not create payment.'
      }
    }
  }

  async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ where: { userId: user.id } })
      return {
        ok: true,
        payments
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not load payments.'
      };
    }
  }

  async checkPromotedRestaurants() {
    const restaurants = await this.restaurants.find({
      where: { isPromoted: true, promotedUntil: LessThan(new Date()) }
    });
    restaurants.forEach(async restaurant => {
      restaurant.isPromoted = false;
      restaurant.promotedUntil = null;
      await this.restaurants.save(restaurant);
    })
  }
}