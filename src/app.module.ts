import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogsController } from '@/blogs/blogs.controller';
import { BlogsModule } from '@/blogs/blogs.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { AppService } from './app.service';
import { configuration } from '@/configs/configuration';
import { UsersResolver } from '@/users/users.resolver';

/**
 * External library
 * */
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
    BlogsModule,
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
