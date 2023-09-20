import { Controller, Post, Body, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/userCredential.dto';
import { User } from '../entity/user.entity';
import { UserCredentailDto } from '../dto/signin.dto';
import { ReqResetPasswordDTO } from '../dto/req.reset.password.dto';
import { ResetPasswordDTO } from '../dto/reset.password.dto';

@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}
  @Post('signin')
  async signIn(
    @Body() signInDto: UserCredentailDto,
  ): Promise<{ acces_token: string }> {
    return this.userService.signIn(signInDto);
  }
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
  @Patch('req-reset-password')
  reqResetPassword(
    @Body() reqResetPassword: ReqResetPasswordDTO,
  ): Promise<void> {
    return this.userService.reqResetPassword(reqResetPassword);
  }
  @Patch('reset-password')
  resetPassword(@Body() resetPassword: ResetPasswordDTO): Promise<void> {
    return this.userService.resetPassword(resetPassword);
  }
}
