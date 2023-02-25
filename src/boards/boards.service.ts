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
  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, description } = createBoardDto;
    const board = this.boardsRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardsRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    const found = await this.boardsRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
    return found;
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }
  //
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
