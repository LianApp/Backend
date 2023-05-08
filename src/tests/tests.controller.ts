import { Controller, Post, Body, Param, UseGuards, ParseIntPipe, Get } from '@nestjs/common';
import { TestsService } from './tests.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { AddAnswerDto } from './dto/add-answer.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('/api/tests')
@ApiTags('tests')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('/:id/start-session')
  async startSession(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) testId: number
  ) {
    return await this.testsService.startSession(testId, user);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @Post('/session/:id')
  async addAnswer(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() addAnswerDto: AddAnswerDto
  ) {
    return await this.addAnswer(user, sessionId, addAnswerDto);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @Post('/session/:id/finish')
  async saveSession(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) sessionId: number,
  ) {
    return await this.saveSession(user, sessionId);
  }

  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Get('/:id/results')
  async getResults(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) testId: number
  ) {
    return await this.testsService.getResults(user, testId);
    
  }
  

}
