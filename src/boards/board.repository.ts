import { Repository } from 'typeorm';
import { Board } from 'src/boards/board.entity';
import { EntityCustomRepository } from 'src/lib/typeorm-ex.decorator';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { BoardStatus } from 'src/boards/board-status.enum';
import { NotFoundException } from '@nestjs/common';

@EntityCustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    // success: { affected: 1 }, not found: { affected: 0 }
    if (result.affected === 0) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);

    return board;
  }
}
