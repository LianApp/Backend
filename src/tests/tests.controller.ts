import { Controller, Post, Body, Param, UseGuards, ParseIntPipe, Get } from '@nestjs/common';
import { TestsService } from './tests.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { AddAnswerDto } from './dto/add-answer.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AddQuestionDto } from './dto/add-question.dto';
import { QuestionDto } from 'src/generated/nestjs-dto/question.dto';
import { SessionResultDto } from 'src/generated/nestjs-dto/sessionResult.dto';
import { Test } from './entities/test.entity';
import { Question } from 'src/generated/nestjs-dto/question.entity';
import { GetQuestionDto } from './dto/get-question.dto';
import { TestSessionDto } from 'src/generated/nestjs-dto/testSession.dto';
import { TestSession } from 'src/generated/nestjs-dto/testSession.entity';
import { AnswerDto } from 'src/generated/nestjs-dto/answer.dto';
import { StudentAnswerDto } from 'src/generated/nestjs-dto/studentAnswer.dto';

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
  @ApiOkResponse({ type: QuestionDto})
  async addQuestion(@UserEntity() user: User, @Param('id', ParseIntPipe) testId: number, @Body() addQuestionDto: AddQuestionDto ) {
    return await this.testsService.addQuestion(user, testId, addQuestionDto);
  }

  @Post('/:id/start-session')
  @ApiOperation({ description: "Start test session" })
  @ApiOkResponse({ type: TestSessionDto })
  async startSession(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) testId: number
  ) {
    return await this.testsService.startSession(testId, user);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Add answer within the session\nRoles: STUDENT" })
  @ApiOkResponse({ type: StudentAnswerDto })
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
  @ApiOkResponse({ type: SessionResultDto })
  @Post('/session/:id/finish')
  async saveSession(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) sessionId: number,
  ) {
    return await this.testsService.saveResults(sessionId, user);
  }

  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Get all test results\nRoles: TEACHER" })
  @Get('/:id/results')
  @ApiOkResponse({ type: SessionResultDto, isArray: true })
  async getResults(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) testId: number
  ) {
    return await this.testsService.getResults(user, testId);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Get all test sessions with results\nRoles: STUDENT" })
  @Get('/:id/sessions')
  @ApiOkResponse({ type: TestSession, isArray: true })
  async getStudentSessions(@UserEntity() user: User, @Param('id', ParseIntPipe) testId: number) {
    return await this.testsService.getStudentSessions(testId, user)
  }

  @Get('/:id')
  @ApiOperation({ description: "Get test with answers and qustions" })
  @ApiOkResponse({ type: Test })
  async getOne(@UserEntity() user: User, @Param('id', ParseIntPipe) testId: number) {
    return await this.testsService.getOne(testId)
  }

  @Get('/questions/:id')
  @ApiOkResponse({ type: GetQuestionDto })
  @ApiOperation({ description: "Get question with answers" })
  async getQuestion(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) questionId: number,
  ) {
    return await this.testsService.getQuestion(questionId)
  }

}
