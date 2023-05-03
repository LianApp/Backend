import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/tests')
@ApiTags('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

}
