"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const post_entity_1 = require("./entities/post.entity");
let PostsService = class PostsService {
    postsRepository;
    cacheManager;
    constructor(postsRepository, cacheManager) {
        this.postsRepository = postsRepository;
        this.cacheManager = cacheManager;
        this.seedData();
    }
    async findAll() {
        const cachedPosts = await this.cacheManager.get('posts');
        if (cachedPosts) {
            return cachedPosts;
        }
        const posts = await this.postsRepository.find({
            order: { date: 'DESC' },
        });
        await this.cacheManager.set('posts', posts, 300000);
        return posts;
    }
    async findOne(id) {
        return this.postsRepository.findOne({ where: { id } });
    }
    async seedData() {
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
            await this.cacheManager.del('posts');
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], PostsService);
//# sourceMappingURL=posts.service.js.map