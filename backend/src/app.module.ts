import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MembersModule } from './members/members.module';
import { Post } from './posts/entities/post.entity';
import { Member } from './members/entities/member.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Post, Member],
      synchronize: true, // Apenas para desenvolvimento
    }),
    CacheModule.register({
      isGlobal: true,
      // Usando cache em memória temporariamente
      // store: require('cache-manager-redis-store'),
      // host: 'localhost',
      // port: 6379,
    }),
    PostsModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
