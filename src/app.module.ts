import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogsController } from '@/blogs/blogs.controller';
import { BlogsModule } from '@/blogs/blogs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: process.env.ENV === 'DEV',
      playground: process.env.ENV === 'DEV',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    BlogsModule,
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService],
})
export class AppModule {}
