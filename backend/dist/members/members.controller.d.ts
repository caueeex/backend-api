import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    findAll(): Promise<Member[]>;
    findOne(id: number): Promise<Member | null>;
}
