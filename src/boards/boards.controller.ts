import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { BoardStatus } from 'src/boards/board-status.enum';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { BoardStatusValidationPipe } from 'src/boards/pipes/board-status-validation.pipe';
import { Board } from 'src/boards/board.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User "${user.username}" retrieving all boards`);
    return this.boardService.getAllBoards(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
