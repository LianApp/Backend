import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  async getAll(@UserEntity() user: User) {
    return await this.subjectsService.findAll(user.organization_id);
  }

  @Post()
  @Roles('ORGANIZATOR')
  @UseGuards(RolesGuard)
  async create(@UserEntity() user: User, createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectsService.create(user.organization_id, createSubjectDto)
  }

  @Delete(':id')
  @Roles('ORGANIZATOR')
  @UseGuards(RolesGuard)
  async delete(@UserEntity() user: User, @Param('id') subjectId: number): Promise<Subject> {
    return await this.subjectsService.remove(user, subjectId);
  }

}
