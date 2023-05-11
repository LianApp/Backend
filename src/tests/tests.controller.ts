import { Controller, Post, Body, Param, UseGuards, ParseIntPipe, Get } from '@nestjs/common';
import { TestsService } from './tests.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { AddAnswerDto } from './dto/add-answer.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AddQuestionDto } from './dto/add-question.dto';

@Controller('/api/tests')
@ApiTags('tests')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('/:id/questions')
  @ApiOperation({ description: "Add new question to test"})
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  async addQuestion(@UserEntity() user: User, @Param('id', ParseIntPipe) testId: number, @Body() addQuestionDto: AddQuestionDto ) {
    return await this.testsService.addQuestion(user, testId, addQuestionDto);
  }

  @Post('/:id/start-session')
  @ApiOperation({ description: "Start test session" })
  async startSession(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) testId: number
  ) {
    return await this.testsService.startSession(testId, user);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Add answer within the session\nRoles: STUDENT" })
  @Post('/session/:id')
  async addAnswer(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() addAnswerDto: AddAnswerDto
  ) {
    return await this.testsService.addAnswer(sessionId, addAnswerDto, user);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Save session and get results\nRoles: STUDENT" })
  @Post('/session/:id/finish')
  async saveSession(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) sessionId: number,
  ) {
    return await this.saveSession(user, sessionId);
  }

  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Get all test results\nRoles: TEACHER" })
  @Get('/:id/results')
  async getResults(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) testId: number
  ) {
    return await this.testsService.getResults(user, testId);
    
  }
  

}
