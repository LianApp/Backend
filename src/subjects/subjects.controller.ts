import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

}
