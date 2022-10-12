import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [BlogsModule],
  controllers: [AppController, BlogsController],
  providers: [AppService, AuthService],
})
export class AppModule {}
