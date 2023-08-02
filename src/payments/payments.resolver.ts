import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "../auth/auth-user.decorator";
import { Role } from "../auth/role.decorator";
import { User } from "../users/entities/user.entity";
import { CreatePaymentInput, CreatePaymentOutput } from "./dtos/create-payments.dto";
import { GetPaymentsOutput } from "./dtos/get-payments.dto";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./payments.service";

@Resolver(of => Payment)
export class PaymentResolver {
  constructor(private readonly paymentServcice: PaymentService) { }

  @Mutation(returns => CreatePaymentOutput)
  @Role(['Owner'])
  createPayment(@AuthUser() owner: User, @Args('input') createPaymentInput: CreatePaymentInput): Promise<CreatePaymentOutput> {
    return this.paymentServcice.createPayment(owner, createPaymentInput);
  }

  @Query(returns => GetPaymentsOutput)
  @Role(['Owner'])
  getPayments(@AuthUser() user: User): Promise<GetPaymentsOutput> {
    return this.paymentServcice.getPayments(user);
  }
}
