import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Member } from './entities/member.entity';
export declare class MembersService {
    private membersRepository;
    private cacheManager;
    constructor(membersRepository: Repository<Member>, cacheManager: Cache);
    findAll(): Promise<Member[]>;
    findOne(id: number): Promise<Member | null>;
    private seedData;
}
