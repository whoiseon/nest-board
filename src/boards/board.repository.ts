import { Repository } from 'typeorm';
import { BoardEntity } from 'src/boards/board.entity';
import { EntityCustomRepository } from 'src/lib/typeorm-ex.decorator';

@EntityCustomRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {}
