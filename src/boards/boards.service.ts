import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/boards/board.entity';
import { BoardRepository } from 'src/boards/board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}

  // private boards: Board[] = [];
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<BoardEntity> {
    return this.boardsRepository.getBoardById(id);
  }

  deleteBoard(id: number): Promise<void> {
    return this.boardsRepository.deleteBoard(id);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
    return this.boardsRepository.updateBoardStatus(id, status);
  }
}
