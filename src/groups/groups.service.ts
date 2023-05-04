import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(organizationId: number, createGroupDto: CreateGroupDto) {
    return await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        organization_id: organizationId
      }
    })
  }

  async findAll(organizationId: number) {
    return await this.prisma.group.findMany({
      where: {
        organization_id: organizationId
      }
    })
  }

  async getStudents(id: number) {
    const group = await this.prisma.group.findUnique({ where: { id: id }, include: { students: true } });
    if (group === null) {
      throw new NotFoundException("Can't find group with given id");
    }
    const students = group.students;
    
    return students.map(s => {
      const {password, ...res} = s;
      return res
    })
  }

  async update(user: User, id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.prisma.group.findUnique({ where: { id: id } });
    if (group.organization_id !== user.organization_id) {
      throw new UnauthorizedException();
    }
    return await this.prisma.group.update({
      where: { id: id },
      data: updateGroupDto
    })
  }

  async remove(user: User, id: number) {
    const group = await this.prisma.group.findUnique({ where: { id: id } });
    if (group.organization_id !== user.organization_id) {
      throw new UnauthorizedException();
    }
    return await this.prisma.group.delete({ where: { id: id } })
  }
}
