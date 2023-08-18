import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/userCredential.dto';
import { User } from '../entity/user.entity';
import { UserCredentailDto } from '../dto/signin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth() // Indica que la autenticación JWT es requerida
export class UserController {
  constructor(readonly userService: UserService) {}
  @Post('signin')
  async signIn(
    @Body() signInDto: UserCredentailDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInDto);
  }
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
