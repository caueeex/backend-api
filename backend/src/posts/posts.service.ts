import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Post[]> {
    // Tentar buscar do cache primeiro
    const cachedPosts = await this.cacheManager.get<Post[]>('posts:all');
    if (cachedPosts) {
      return cachedPosts;
    }

    // Se não estiver em cache, buscar do banco
    const posts = await this.postsRepository.find({ 
      relations: ['member'],
      order: { created_at: 'DESC' }
    });

    // Salvar no cache por 60 segundos
    await this.cacheManager.set('posts:all', posts, 60);
    
    return posts;
  }

  async findOne(id: number): Promise<Post | null> {
    // Tentar buscar do cache primeiro
    const cachedPost = await this.cacheManager.get<Post>(`posts:${id}`);
    if (cachedPost) {
      return cachedPost;
    }

    // Se não estiver em cache, buscar do banco
    const post = await this.postsRepository.findOne({ 
      where: { id },
      relations: ['member']
    });

    if (post) {
      // Salvar no cache por 60 segundos
      await this.cacheManager.set(`posts:${id}`, post, 60);
    }
    
    return post;
  }

  // Método para invalidar cache quando necessário
  async invalidateCache(): Promise<void> {
    await this.cacheManager.del('posts:all');
    // Limpar cache de posts individuais (simplificado)
    for (let i = 1; i <= 10; i++) {
      await this.cacheManager.del(`posts:${i}`);
    }
  }
} 