import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import config from 'src/common/configs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer'
import { EmailConsumer } from './email.processor';
import { TestsModule } from './tests/tests.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { GroupsModule } from './groups/groups.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LessonsModule } from './lessons/lessons.module';
import { TeachersModule } from './teachers/teachers.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env["EMAIL_USER"],
          pass: process.env["EMAIL_PASS"]
        }
      }
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT ?? "6379")
      }
    }),
    AuthModule,
    UsersModule,
    PrometheusModule.register(),
    TestsModule,
    OrganizationsModule,
    GroupsModule,
    CoursesModule,
    SubjectsModule,
    LessonsModule,
    TeachersModule,
  ],
  exports: [MailerModule],
  controllers: [AppController],
  providers: [AppService, EmailConsumer],
})
export class AppModule { }
