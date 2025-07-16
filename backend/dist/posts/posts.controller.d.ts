import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
}
