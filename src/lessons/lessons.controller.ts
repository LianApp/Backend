import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe, UseInterceptors, UploadedFiles, BadRequestException, HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsService } from './lessons.service';
import { LessonModel } from './models/lesson.model';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { cloudStorage } from 'src/common/utils/storage';
import { CreateTestDto } from 'src/tests/dto/create-test.dto';
import { LessonDto } from 'src/generated/nestjs-dto/lesson.dto';

@Controller()
@ApiTags('lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get("/api/lessons/:id")
  @ApiOkResponse({type: LessonDto})
  @ApiOperation({ description: "Get lesson by id" })
  async getLesson(@Param('id', new ParseIntPipe()) lessonId: number) {
    return await this.lessonsService.getLesson(lessonId);
  }

  @Post('/api/course/:id/lessons')
  @ApiConsumes('multipart/form-data')
  @ApiTags('courses')
  @ApiOperation({ description: "Create lesson\nRoles: TEACHER" })
  @ApiBody({
    type: CreateLessonDto
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'presentation', maxCount: 1},
    {name: 'lecture', maxCount: 1},
  ], { storage: diskStorage({
      destination: join(process.cwd(), './files'),
      filename: (_, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
    , fileFilter(req, file, callback) {
        if (file.fieldname === 'presentation') {
          const ext = extname(file.originalname);
          if (!['.pptx', '.pdf', '.ppt'].includes(ext)) {
            return callback(new UnprocessableEntityException('presentation file must be pptx ppt of pdf'), false)
          }
        }
        if (file.fieldname === 'lecture') {
          const ext = extname(file.originalname);
          if (!['.docx', '.doc', '.pdf'].includes(ext)) {
            return callback(new UnprocessableEntityException('lecture file must be docx doc of pdf'), false)
          }
        }

        return callback(null, true)
    },}))
  async createLesson(
    @Param('id', new ParseIntPipe()) courseId: number,
    @UserEntity() user: User,
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFiles() files: { lecture: Express.Multer.File[], presentation: Express.Multer.File[] }
  ) {
    
    if (!files
      || !files?.presentation 
      || !files?.lecture 
      || files?.presentation.length !==  1
      || files?.lecture.length !== 1
    ) {
      throw new BadRequestException('You should provide lecture and presentation files');
    }
    
    if (!createLessonDto.title) {
      throw new BadRequestException('You should provide and title');
    }
    
    const { lecture, presentation } = files;
    const l = lecture[0];
    const p = presentation[0];


    const FILES_PATH = join(process.cwd(), './files');
    
    await cloudStorage.Upload({
      path: join(FILES_PATH, l.filename),
      name: l.filename,
    }, "/")

    await cloudStorage.Upload({
      path: join(FILES_PATH, p.filename),
      name: p.filename,
    }, "/")
    

    const prefix = "https://storage.yandexcloud.net/share-buckett/"


    const lecturePath = prefix + l.filename;
    const presentationPath = prefix + p.filename;

    return await this.lessonsService.create(courseId, createLessonDto.title, presentationPath, lecturePath)
    
  }


  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: "Create test by title\nRoles: TEACHER"})
  @Post('/api/lessons/:id/test')
  async createTest(
    @UserEntity() user: User,
    @Param('id', ParseIntPipe) lessonId: number,
    @Body() createTestDto: CreateTestDto,
  ) {
    return await this.lessonsService.createTest(user, lessonId, createTestDto)
  }

}
