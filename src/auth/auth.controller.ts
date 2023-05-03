import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Token } from './models/token.model';
import { UserModel } from './models/user.model';

@Controller()
@ApiTags('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post("/login")
    @ApiBody({type: LoginDto})
    async login(@Body() { email, password }: LoginDto): Promise<Token> {
        const token = await this.auth.login(email, password);
        return token
    }

    @UseGuards(JwtAuthGuard)
    @Get("/me")
    @ApiOkResponse({type: OmitType(UserModel, ['password'])})
    async getme(@UserEntity() user: User) {
        const {password, ...rest} = user;
        return rest;
    }
}
