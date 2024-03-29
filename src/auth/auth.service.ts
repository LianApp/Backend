import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly configService: ConfigService
    ) {}

    async getUser(id: number) {
        return await this.prisma.user.findUnique({ where: { id: id }, include: { group: true } })
    }

    async login(email: string, password: string): Promise<Token> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const passwordValid = await this.passwordService.validatePassword(
            password,
            user.password
        );

        if (!passwordValid) {
            throw new BadRequestException('Invalid password');
        }

        return this.generateTokens({
            userId: user.id,
        });
    }

    validateUser(userId: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    getUserFromToken(token: string): Promise<User | null> {
        const user = this.jwtService.decode(token);
        if (!user) {
            throw new ForbiddenException()
        }
        const id = user['userId'];
        return this.prisma.user.findUnique({ where: { id } });
    }

    refreshToken(token: string) {
        try {
            const { userId } = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });

            return this.generateTokens({
                userId,
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    generateTokens(payload: { userId: number }): Token {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    private generateAccessToken(payload: { userId: number }): string {
        return this.jwtService.sign(payload);
    }

    private generateRefreshToken(payload: { userId: number }): string {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: securityConfig?.refreshIn,
        });
    }

}
