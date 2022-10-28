import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogsController } from '@/blogs/blogs.controller';
import { BlogsModule } from '@/blogs/blogs.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

/**
 * External library
 * */
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService],
})
export class AppModule {}
