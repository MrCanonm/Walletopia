import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/userCredential.dto';
import { User } from '../entity/user.entity';
import { UserCredentailDto } from '../dto/signin.dto';
import { ReqResetPasswordDTO } from '../dto/req.reset.password.dto';
import { ResetPasswordDTO } from '../dto/reset.password.dto';
import { ChangePasswordDTO } from '../dto/change.password.dto';
import { GetUser } from '../comun/get.user.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  changePassword(
    @Body() changePasswordDTO: ChangePasswordDTO,
    @GetUser() user: User,
  ): Promise<void> {
    return this.userService.changePassword(changePasswordDTO, user);
  }
}
