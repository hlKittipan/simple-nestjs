import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
