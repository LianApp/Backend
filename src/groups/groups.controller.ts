import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('/api/groups')
@ApiTags('groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @Roles('TEACHER', 'ORGANIZATOR')
  @UseGuards(RolesGuard)
  async getAll(@UserEntity() user: User) {
    return await this.groupsService.findAll(user.organization_id);
  }

  @Get(':id/students')
  @Roles('TEACHER', 'ORGANIZATOR')
  @UseGuards(RolesGuard)
  async getStudents(@Param('id') groupId: number) {
    return await this.groupsService.getStudents(groupId);
  }
  
  @Put(':id')
  @Roles('ORGANIZATOR')
  @UseGuards(RolesGuard)
  async updateGroup(
    @UserEntity() user: User,
    @Param('id') courseId: number,
    @Body() updateGroupDto: UpdateGroupDto
  ) {
    return await this.groupsService.update(user, courseId, updateGroupDto);
  }

  @Post()
  @Roles('ORGANIZATOR')
  @UseGuards(RolesGuard)
  async createGroup(@UserEntity() user: User, createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(user.organization_id, createGroupDto);
  }
 
}
