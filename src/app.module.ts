import { ApolloDriver } from '@nestjs/apollo';
import {
  Module
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Context } from 'graphql-ws';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { TOKEN_KEY } from './common/common.constans';
import { CommonModule } from './common/common.module';
import { HealthModule } from './health/health.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { OrderItem } from './orders/entities/order-item.entity';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { Payment } from './payments/entities/payment.entity';
import { PaymentsModule } from './payments/payments.module';
import { Category } from './restaurants/entities/category.entity';
import { Dish } from './restaurants/entities/dish.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UploadsModule } from './uploads/uploads.module';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("dev", "prod", "test")
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
        AWS_ACCESS_KEY: Joi.string().required(),
        AWS_SECRET_ACESS_KEY: Joi.string().required()
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== "prod" && process.env.NODE_ENV !== "test",
      entities: [User, Verification, Restaurant, Category, Dish, Order, OrderItem, Payment],
      ssl: process.env.NODE_ENV === 'prod' ? {
        ca: fs.readFileSync('ap-northeast-2-bundle.pem')
      } : false,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: Context) => {
            const { connectionParams, extra } = context;
            extra["token"] = connectionParams[TOKEN_KEY];
          }
        }
      },
      autoSchemaFile: true,
      context: ({ req, extra }) => {
        return { token: req ? req.headers[TOKEN_KEY] : extra.token };
      },
      playground: process.env.NODE_ENV !== 'prod'
    }),
    ScheduleModule.forRoot(),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }),
    AuthModule,
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    CommonModule,
    PaymentsModule,
    UploadsModule.forRoot({
      accessKey: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
    }),
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }