import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('/api/tests')
@ApiTags('tests')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

}
