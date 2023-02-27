import { EntityCustomRepository } from 'src/lib/typeorm-ex.decorator';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';

@EntityCustomRepository(User)
export class UserRepository extends Repository<User> {}
