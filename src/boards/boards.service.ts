import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { BoardRepository } from 'src/boards/board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository.getAllBoards(user);
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoard(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoard(id, user);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }
}
