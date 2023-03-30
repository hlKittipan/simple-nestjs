import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('PORT', 3000);
  await app.listen(appPort);

  const stage = process.env.ENV;
  Logger.log(
    'App is running in "' +
      stage +
      '" stage, and it is listening at: http://localhost:' +
      appPort +
      '/',
  );
}
bootstrap();
