import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {

  constructor(private readonly prisma: PrismaService) {}
  
  async create(createSubjectDto: CreateSubjectDto) {
    return await this.prisma.subject.create({
      data: {
        name: createSubjectDto.name
      }
    })
  }

  async findAll(user: User) {
    return await this.prisma.subject.findMany({
      where: {
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
