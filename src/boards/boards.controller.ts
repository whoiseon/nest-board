import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { BoardStatus } from 'src/boards/board-status.enum';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { BoardStatusValidationPipe } from 'src/boards/pipes/board-status-validation.pipe';
import { BoardEntity } from 'src/boards/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardService.getAllBoards();
  // }
  //
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardService.getBoardById(id);
  }
  //
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string) {
  //   return this.boardService.deleteBoard(id);
  // }
  //
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
