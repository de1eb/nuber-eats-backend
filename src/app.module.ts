import { ApolloDriver } from '@nestjs/apollo';
import {
  Module
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Context } from 'graphql-ws';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { TOKEN_KEY } from './common/common.constans';
import { CommonModule } from './common/common.module';
import { HealthModule } from './health/health.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { typeorm_config_dev, typeorm_config_prod, typeorm_config_test } from './typeormConfig';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? './.prod.env' : process.env.NODE_ENV === 'dev' ? './.dev.env' : process.env.NODE_ENV === 'test' ? './.test.env' : null,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("dev", "prod", "test")
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
        AWS_ACCESS_KEY: Joi.string().required(),
        AWS_SECRET_ACESS_KEY: Joi.string().required()
      }),
    }),
    TypeOrmModule.forRoot(process.env.NODE_ENV === 'prod' ? typeorm_config_prod : process.env.NODE_ENV === 'dev' ? typeorm_config_dev : process.env.NODE_ENV === 'test' ? typeorm_config_test : null),
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
    JwtModule.forRoot({ privateKey: process.env.JWT_PRIVATE_KEY }),
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