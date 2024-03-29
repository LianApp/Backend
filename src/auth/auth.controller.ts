import { Body, Controller, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags, OmitType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.input';
import { Token } from './models/token.model';
import { UserModel } from './models/user.model';

@Controller()
@ApiTags('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post("api/login")
    @ApiBody({ type: LoginDto })
    @ApiOperation({ description: "Log in via email and password" })
    async login(@Body() { email, password }: LoginDto): Promise<Token> {
        const token = await this.auth.login(email, password);
        return token
    }

    @UseGuards(JwtAuthGuard)
    @Get("api/me")
    @ApiBearerAuth()
    @ApiOperation({ description: "Get user entity" })
    @ApiOkResponse({ type: OmitType(UserModel, ['password']) })
    async getme(@UserEntity() user: User) {
        const userEntity = await this.auth.getUser(user.id);
        if (!userEntity) {
            throw new NotFoundException("Can't decode user token")
        }
        const { password, ...rest } = userEntity;
        return rest;
    }

    @Post('/api/refresh')
    @ApiOperation({ description: "Refresh auth token" })
    @ApiOkResponse({ type: Token })
    async refresh(@Body() refreshToken: RefreshTokenDto) {
        return this.auth.refreshToken(refreshToken.refreshToken)
    }
}
