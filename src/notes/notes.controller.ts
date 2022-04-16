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
import { NotesDto } from './dto/notes.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get('/')
  getNotes() {
    return this.notesService.notes();
  }

  @Get('/stats')
  getCategoriesStatistics() {
    return this.notesService.categoriesStatistic();
  }

  @Get('/categories')
  getCategories() {
    return this.notesService.categories();
  }

  @Post('/')
  createNote(@Body() noteDTO: NotesDto) {
    return this.notesService.create(noteDTO);
  }

  @Post('/category')
  createCategory(@Body() categoryDTO: CategoryDto) {
    return this.notesService.category(categoryDTO);
  }

  @Get('/:id')
  getNoteById(@Param('id') id) {
    return this.notesService.note(+id);
  }

  @Delete('/:id')
  deleteNoteById(@Param('id') id) {
    return this.notesService.remove(+id);
  }

  @Patch('/:id')
  updateNote(@Param('id') id, @Body() noteDTO: NotesDto) {
    return this.notesService.update(+id, noteDTO);
  }

  @Patch('/:id/archived')
  archivedNote(@Param('id') id) {
    return this.notesService.archived(+id);
  }
}
