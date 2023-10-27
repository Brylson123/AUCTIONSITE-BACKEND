import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserResponse } from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}
  @Post('/register')
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    console.log({ newUser });
    return this.userService.register(newUser);
  }
}
