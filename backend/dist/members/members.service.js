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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const member_entity_1 = require("./entities/member.entity");
let MembersService = class MembersService {
    membersRepository;
    cacheManager;
    constructor(membersRepository, cacheManager) {
        this.membersRepository = membersRepository;
        this.cacheManager = cacheManager;
        this.seedData();
    }
    async findAll() {
        const cachedMembers = await this.cacheManager.get('members');
        if (cachedMembers) {
            return cachedMembers;
        }
        const members = await this.membersRepository.find({
            order: { name: 'ASC' },
        });
        await this.cacheManager.set('members', members, 300000);
        return members;
    }
    async findOne(id) {
        return this.membersRepository.findOne({ where: { id } });
    }
    async seedData() {
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
            await this.cacheManager.del('members');
        }
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], MembersService);
//# sourceMappingURL=members.service.js.map