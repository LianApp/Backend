import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/models/user.model';
import { Token } from './token.model';

export class Auth extends Token {
  
  @ApiProperty({type: User})
  user: User;
  
}
