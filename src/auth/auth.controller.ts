import { Controller, Post, Body, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('auth.register.user', registerUserDto),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('auth.login.user', loginUserDto),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
