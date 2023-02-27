import { Repository } from 'typeorm';
import { Board } from 'src/boards/board.entity';
import { EntityCustomRepository } from 'src/lib/typeorm-ex.decorator';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { BoardStatus } from 'src/boards/board-status.enum';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@EntityCustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
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

  async deleteBoard(id: number, user: User): Promise<void> {
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
