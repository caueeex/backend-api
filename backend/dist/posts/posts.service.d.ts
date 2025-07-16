import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private postsRepository;
    private cacheManager;
    constructor(postsRepository: Repository<Post>, cacheManager: Cache);
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
    private seedData;
}
