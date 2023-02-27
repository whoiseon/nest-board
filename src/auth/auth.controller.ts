import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { LoginResponse } from 'src/auth/auth.type';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginResponse> {
    return this.authService.login(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(JwtAuthGuard)
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}
