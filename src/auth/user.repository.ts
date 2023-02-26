import { EntityCustomRepository } from 'src/lib/typeorm-ex.decorator';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@EntityCustomRepository(User)
export class UserRepository extends Repository<User> {
  SALT_ROUNDS = 10;

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('UsernameExistsError');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
