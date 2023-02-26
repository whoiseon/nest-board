import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { BoardRepository } from 'src/boards/board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }
}
