import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/auth/auth.type';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  SALT_ROUNDS = 10;

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('UsernameExistsError');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<LoginResponse> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });
    const compared = await bcrypt.compare(password, user.password);
    if (user && compared) {
      const payload = { id: user.id, username };
      const accessToken = this.jwtService.sign(payload);

      return {
        payload,
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
