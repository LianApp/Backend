import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { User as UserModel } from 'src/users/models/user.model';

@Controller('/api/groups')
@ApiTags('groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @Roles('TEACHER', 'ORGANIZATOR')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Get all organization groups\nRoles: TEACHER, ORGANIZATOR" })
  @ApiOkResponse({ type: Group, isArray: true })
  async getAll(@UserEntity() user: User) {
    return await this.groupsService.findAll(user.organization_id);
  }

  @Get(':id/students')
  @Roles('TEACHER', 'ORGANIZATOR')
  @ApiOperation({ description: "Get all group students\nRoles: TEACHER, ORGANIZATOR" })
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: UserModel, isArray: true })
  async getStudents(@Param('id', new ParseIntPipe()) groupId: number) {
    return await this.groupsService.getStudents(groupId);
  }
  
  @Put(':id')
  @Roles('ORGANIZATOR')
  @ApiOperation({ description: "Update group\nRoles: ORGANIZATOR" })
  @UseGuards(RolesGuard)
  async updateGroup(
    @UserEntity() user: User,
    @Param('id', new ParseIntPipe()) courseId: number,
    @Body() updateGroupDto: UpdateGroupDto
  ) {
    return await this.groupsService.update(user, courseId, updateGroupDto);
  }

  @Post()
  @Roles('ORGANIZATOR')
  @ApiOperation({ description: "Create group\nRoles: ORGANIZATOR" })
  @UseGuards(RolesGuard)
  async createGroup(@UserEntity() user: User, @Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(user.organization_id, createGroupDto);
  }
 
}
