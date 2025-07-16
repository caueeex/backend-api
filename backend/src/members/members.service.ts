import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.seedData();
  }

  async findAll(): Promise<Member[]> {
    // Verificar cache primeiro
    const cachedMembers = await this.cacheManager.get<Member[]>('members');
    if (cachedMembers) {
      return cachedMembers;
    }

    // Se não estiver em cache, buscar do banco
    const members = await this.membersRepository.find({
      order: { name: 'ASC' },
    });

    // Salvar no cache por 5 minutos
    await this.cacheManager.set('members', members, 300000);

    return members;
  }

  async findOne(id: number): Promise<Member | null> {
    return this.membersRepository.findOne({ where: { id } });
  }

  private async seedData() {
    const count = await this.membersRepository.count();
    if (count === 0) {
      const mockMembers = [
        {
          name: 'João Silva',
          email: 'joao.silva@stefanini.com',
          role: 'Desenvolvedor Senior',
          department: 'Tecnologia',
          avatar: 'https://via.placeholder.com/150',
        },
        {
          name: 'Maria Santos',
          email: 'maria.santos@stefanini.com',
          role: 'Product Manager',
          department: 'Produto',
          avatar: 'https://via.placeholder.com/150',
        },
        {
          name: 'Pedro Costa',
          email: 'pedro.costa@stefanini.com',
          role: 'DevOps Engineer',
          department: 'Infraestrutura',
          avatar: 'https://via.placeholder.com/150',
        },
        {
          name: 'Ana Oliveira',
          email: 'ana.oliveira@stefanini.com',
          role: 'UX Designer',
          department: 'Design',
          avatar: 'https://via.placeholder.com/150',
        },
        {
          name: 'Carlos Ferreira',
          email: 'carlos.ferreira@stefanini.com',
          role: 'Tech Lead',
          department: 'Tecnologia',
          avatar: 'https://via.placeholder.com/150',
        },
        {
          name: 'Juliana Lima',
          email: 'juliana.lima@stefanini.com',
          role: 'QA Engineer',
          department: 'Qualidade',
          avatar: 'https://via.placeholder.com/150',
        },
      ];

      for (const memberData of mockMembers) {
        const member = this.membersRepository.create(memberData);
        await this.membersRepository.save(member);
      }

      // Limpar cache após inserir dados
      await this.cacheManager.del('members');
    }
  }
} 