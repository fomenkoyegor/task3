import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { INote } from './interfaces/INote';
import { NotesDto } from './dto/notes.dto';
import { ICategory } from './interfaces/ICategory';
import { ICategoryStat } from './interfaces/ICategoryStat';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get('/')
  getNotes(): INote[] {
    return this.notesService.notes();
  }

  @Get('/stats')
  getCategoriesStatistics(): ICategoryStat[] {
    return this.notesService.categoriesStatistic();
  }

  @Get('/categories')
  getCategories(): ICategory[] {
    return this.notesService.categories();
  }

  @Post('/')
  createNote(@Body() noteDTO: NotesDto): INote {
    return this.notesService.create(noteDTO);
  }

  @Get('/:id')
  getNoteById(@Param('id') id): INote {
    return this.notesService.note(+id);
  }

  @Delete('/:id')
  deleteNoteById(@Param('id') id): INote {
    return this.notesService.remove(+id);
  }

  @Patch('/:id')
  updateNote(@Param('id') id, @Body() noteDTO: NotesDto): INote {
    return this.notesService.update(id, noteDTO);
  }

  @Patch('/:id/archived')
  archivedNote(@Param('id') id): INote {
    return this.notesService.archived(+id);
  }
}
