import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import { join, resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND
  }));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, options);

    const outputPath = resolve(process.cwd(), 'swagger.json');
    writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8'});
    
    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  app.useStaticAssets(join(__dirname, '..', 'files'), { prefix: '/storage/' })


  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
