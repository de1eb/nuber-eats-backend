import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { SSL_CERTIFICATE_LETS_ENCRYPT_PATH, SSL_CERTIFICATE_SELFSIGNED_PATH, SSL_KEY_LETS_ENCRYPT_PATH, SSL_KEY_SELFSIGNED_PATH } from './common/common.constans';

async function bootstrap() {
  const keyFile = process.env.NODE_ENV === 'prod' ? fs.readFileSync(SSL_KEY_LETS_ENCRYPT_PATH) : fs.readFileSync(SSL_KEY_SELFSIGNED_PATH);
  const certFile = process.env.NODE_ENV === 'prod' ? fs.readFileSync(SSL_CERTIFICATE_LETS_ENCRYPT_PATH) : fs.readFileSync(SSL_CERTIFICATE_SELFSIGNED_PATH);
  let app = await NestFactory.create(AppModule);

  process.env.NODE_ENV === 'prod' ? app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile
    }
  }) : null;

  const corsConfig = process.env.NODE_ENV === 'prod' ? {
    origin: ["https://nuber-eats.click, https://www.nuber-eats.click"],
    methods: ['PUT']
  } : {
    origin: ["http://localhost:3000"],
    methods: ['PUT']
  }

  const port = 4000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsConfig)
  await app.listen(port);
}
bootstrap();
