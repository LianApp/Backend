import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Token } from './models/token.model';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("/login")
  async login(@Body() {email, password}: LoginDto): Promise<Token> {
    const token = await this.auth.login(email, password);
    return token
  }

}
