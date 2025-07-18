import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { PostsModule } from './posts/posts.module';
import { Member } from './members/entities/member.entity';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '', // Senha vazia
      database: process.env.DB_DATABASE || 'stefanini_db',
      entities: [Member, Post],
      autoLoadEntities: false,
      synchronize: false, // Desabilitar sincronização automática
      dropSchema: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      ttl: 60, // segundos
      isGlobal: true,
    }),
    MembersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
