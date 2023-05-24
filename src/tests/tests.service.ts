import { ForbiddenException, Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { Question, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AddQuestionDto } from './dto/add-question.dto';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestsService {

    constructor(private readonly prisma: PrismaService) {}

  async getOne(testId: number) {
    return await this.prisma.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          include: {
            answers: true
          }
        },
      }
    })
  }

  async getQuestion(questionId: number) {
    return await this.prisma.question.findUnique({
      where: { id: questionId },
      include: {
        answers: true
      }
    })
  }

    async createTest(user: User, lessonId: number, createTestDto: CreateTestDto) {
        const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId }, include: { course: true } });
        if (user.id !== lesson?.course.teacher_id) {
            throw new ForbiddenException("You have not access to create test for this lesson")
        }
        return await this.prisma.test.create({
            data: {
                lesson_id: lessonId,
                title: createTestDto.title,
            }
        })
    }

    async addQuestion(user: User, testId: number, addQuestionDto: AddQuestionDto) {
        return await this.prisma.question.create({
            data: {
                test_id: testId,
                text: addQuestionDto.text,
                type: addQuestionDto.type,
                answers: {
                    createMany: { data: addQuestionDto.answers }
                }
            }
        })

    }

  async getStudentSessions(testId: number, user: User) {
    
    const sessions = await this.prisma.testSession.findMany({
      where: {
        test_id: testId,
        student_id: user.id
      },
      include: {
        results: true
      }
    });

    return sessions;
    
  }

    async getResults(user: User, testId: number) {
        const test = await this.prisma.test.findUnique({
            where: {
                id: testId
            },
            include: {
                sessions: {
                    include: {
                        results: true
                    }
                }
            }
        })


        if (!test) {
            throw new NotFoundException("Can't find test with given id");
        }

        const sessions = test.sessions;
        const results = sessions.flatMap(s => s.results)
        return results;
    }

    async startSession(testId: number, user: User) {
        const test = await this.prisma.test.findUnique({
            where: { id: testId },
            include: { questions: true }
        });

        if (!test || test.questions.length < 1) {
            throw new ForbiddenException("Can't start test with 0 questions");
        }

        await this.prisma.testSession.create({
            data: {
                test_id: testId,
                student_id: user.id,
            }
        })
    }

    async addAnswer(sessionId: number, addAnswerDto: AddAnswerDto, user: User) {

        const session = await this.prisma.testSession.findUnique({
            where: {
                id: sessionId
            }
        });

        if (!session) {
            throw new NotFoundException("Session with given id does not exists")
        }

        if (session.student_id !== user.id) {
            throw new ForbiddenException("You can't access this api method")
        }

        await this.prisma.answer.findFirstOrThrow({ where: { id: addAnswerDto.answerId } })
        await this.prisma.question.findFirstOrThrow({ where: { id: addAnswerDto.questionId } })
        await this.prisma.testSession.findFirstOrThrow({ where: { id: sessionId } })

        return await this.prisma.studentAnswer.create({
            data: {
                session_id: sessionId,
                answer_id: addAnswerDto.answerId,
                question_id: addAnswerDto.questionId
            }
        })
    }

    async saveResults(sessionId: number, user: User) {

        const session = await this.prisma.testSession.findUnique({
            where: {
                id: sessionId
            },
            include: {
                answers: true,
                test: {
                    include: {
                        questions: {
                            include: {
                                answers: true
                            }
                        },
                    }
                }
            }
        });

        if (!session) {
            throw new NotFoundException("Session with given id does not exists")
        }

        if (session.student_id !== user.id) {
            throw new ForbiddenException("You can't access this api method")
        }

        const userAnswers = session.answers;
        const testQuestions = session.test.questions;

        type QuestionWithRightAnswer = Question & {
            rightAnswerId: number | undefined
        }

        const questionsMap = testQuestions.reduce<Record<number, QuestionWithRightAnswer>>((acc, v) => {
            acc[v.id] = {
                ...v,
                rightAnswerId: v.answers.find(a => a.correct)?.id
            };

            return acc;
        }, {})


        const total = testQuestions.length;

        const correctAnswers = userAnswers.reduce((acc, v) => {
            const question = questionsMap[v.question_id];
            if (v.answer_id === question.rightAnswerId) {
                return acc + 1;
            }
            return acc;
        }, 0)

        if (total === 0) {
            throw new ForbiddenException("Can't calculate results for test with 0 questions")
        }

        const percentage = Math.round(correctAnswers / (total / 100))

        const testResult = await this.prisma.sessionResult.create({
            data: {
                session_id: sessionId,
                total: total,
                correct: correctAnswers,
                percentage: percentage
            }
        })

        return testResult;
    }
}
