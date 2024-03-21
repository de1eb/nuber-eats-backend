import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { SSL_PATH } from './common/common.constans';

async function bootstrap() {
  const keyFile = fs.readFileSync(SSL_PATH + '/key.pem');
  const certFile = fs.readFileSync(SSL_PATH + '/cert.pem');
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile
    }
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ["https://nuber-eats.work"],
    methods: ['PUT']
  })
  await app.listen(4000);
}
bootstrap();
