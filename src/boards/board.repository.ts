import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BoardEntity } from 'src/boards/board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {
    super(
      boardRepository.target,
      boardRepository.manager,
      boardRepository.queryRunner,
    );
  }
}
