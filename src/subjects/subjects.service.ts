import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {

  constructor(private readonly prisma: PrismaService) {}
  
  async create(organizationId: number, createSubjectDto: CreateSubjectDto) {
    return await this.prisma.subject.create({
      data: {
        organization_id: organizationId,
        name: createSubjectDto.name
      }
    })
  }

  async findAll(organizationId: number) {
    return await this.prisma.subject.findMany({
      where: {
        organization_id: organizationId
      }
    });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.prisma.subject.update({
      where: {
        id: id
      },
      data: {
        ...updateSubjectDto
      }
    })
  }

  async remove(user: User, id: number) {
    const subject = await this.prisma.subject.findUnique({ where: { id: id } });
    if (subject.organization_id !== user.organization_id) {
      throw new UnauthorizedException()
    }
    return await this.prisma.subject.delete({ where: { id: id }});
  }
}
