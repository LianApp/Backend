import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './models/subject.model';

@Controller('/api/subjects')
@ApiTags('subjects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @Roles('ORGANIZATOR')
  @ApiOkResponse({ type: Subject, isArray: true })
  @ApiOperation({ description: "Get all organization subjects\nRoles: ORGANIZATOR" })
  async getAll(@UserEntity() user: User) {
    return await this.subjectsService.findAll(user.organization_id);
  }

  @Post()
  @Roles('ORGANIZATOR')
  @ApiOperation({ description: "Create organization\nRoles: ORGANIZATOR" })
  @ApiOkResponse({ type: Subject })
  @UseGuards(RolesGuard)
  async create(@UserEntity() user: User, @Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectsService.create(user.organization_id, createSubjectDto)
  }

  @Delete(':id')
  @Roles('ORGANIZATOR')
  @ApiOkResponse({ type: Subject })
  @ApiOperation({ description: "Delete organization\nRoles: ORGANIZATOR" })
  @UseGuards(RolesGuard)
  async delete(@UserEntity() user: User, @Param('id', new ParseIntPipe()) subjectId: number): Promise<Subject> {
    return await this.subjectsService.remove(user, subjectId);
  }

}
