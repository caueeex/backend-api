import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Member | null> {
    return this.membersService.findOne(id);
  }

  @Get('profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number): Promise<Member | null> {
    return this.membersService.findOne(id);
  }
} 