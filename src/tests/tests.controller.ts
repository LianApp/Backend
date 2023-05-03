import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tests')
@ApiTags('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

}
