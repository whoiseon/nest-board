import { Repository } from 'typeorm';
import { BoardEntity } from 'src/boards/board.entity';
import { EntityRepository } from 'src/lib/typeorm-ex.decorator';

@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {}
