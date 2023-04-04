import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogModule } from '@blog/blog.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { AppService } from './app.service';
import { configuration } from '@configs/configuration';
import { LoggerMiddleware } from '@middleware/logger/logger.middleware';

/**
 * External library
 * */
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
