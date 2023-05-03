import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Token } from './models/token.model';

@Controller()
@ApiTags('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post("/login")
    async login(@Body() { email, password }: LoginDto): Promise<Token> {
        const token = await this.auth.login(email, password);
        return token
    }

    @UseGuards(JwtAuthGuard)
    @Get("/me")
    async getme(@UserEntity() user: User) {
        const {password, ...rest} = user;
        return rest;
    }
}
