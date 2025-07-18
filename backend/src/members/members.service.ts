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
  ) {}

  async findAll(): Promise<Member[]> {
    // Tentar buscar do cache primeiro
    const cachedMembers = await this.cacheManager.get<Member[]>('members:all');
    if (cachedMembers) {
      return cachedMembers;
    }

    // Se não estiver em cache, buscar do banco
    const members = await this.membersRepository.find({
      order: { created_at: 'DESC' }
    });

    // Salvar no cache por 60 segundos
    await this.cacheManager.set('members:all', members, 60);
    
    return members;
  }

  async findOne(id: number): Promise<Member | null> {
    // Tentar buscar do cache primeiro
    const cachedMember = await this.cacheManager.get<Member>(`members:${id}`);
    if (cachedMember) {
      return cachedMember;
    }

    // Se não estiver em cache, buscar do banco
    const member = await this.membersRepository.findOne({ where: { id } });

    if (member) {
      // Salvar no cache por 60 segundos
      await this.cacheManager.set(`members:${id}`, member, 60);
    }
    
    return member;
  }

  // Método para invalidar cache quando necessário
  async invalidateCache(): Promise<void> {
    await this.cacheManager.del('members:all');
    // Limpar cache de members individuais (simplificado)
    for (let i = 1; i <= 10; i++) {
      await this.cacheManager.del(`members:${i}`);
    }
  }
} 