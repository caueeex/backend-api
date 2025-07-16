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
  ) {
    this.seedData();
  }

  async findAll(): Promise<Post[]> {
    // Verificar cache primeiro
    const cachedPosts = await this.cacheManager.get<Post[]>('posts');
    if (cachedPosts) {
      return cachedPosts;
    }

    // Se não estiver em cache, buscar do banco
    const posts = await this.postsRepository.find({
      order: { date: 'DESC' },
    });

    // Salvar no cache por 5 minutos
    await this.cacheManager.set('posts', posts, 300000);

    return posts;
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({ where: { id } });
  }

  private async seedData() {
    const count = await this.postsRepository.count();
    if (count === 0) {
      const mockPosts = [
        {
          title: 'Nova Tecnologia Implementada',
          content: 'Implementamos com sucesso uma nova tecnologia que melhora significativamente a performance do sistema.',
          author: 'João Silva',
          likes: 24,
        },
        {
          title: 'Reunião de Equipe',
          content: 'Agendada reunião para discutir os próximos passos do projeto de desenvolvimento.',
          author: 'Maria Santos',
          likes: 18,
        },
        {
          title: 'Atualização de Segurança',
          content: 'Nova atualização de segurança foi aplicada em todos os sistemas.',
          author: 'Pedro Costa',
          likes: 31,
        },
        {
          title: 'Novo Projeto Iniciado',
          content: 'Iniciamos um novo projeto de desenvolvimento com foco em inovação e qualidade.',
          author: 'Ana Oliveira',
          likes: 15,
        },
        {
          title: 'Melhorias no Sistema',
          content: 'Implementamos melhorias significativas no sistema principal da empresa.',
          author: 'Carlos Ferreira',
          likes: 22,
        },
      ];

      for (const postData of mockPosts) {
        const post = this.postsRepository.create(postData);
        await this.postsRepository.save(post);
      }

      // Limpar cache após inserir dados
      await this.cacheManager.del('posts');
    }
  }
} 