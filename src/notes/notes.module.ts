import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepositoryService } from './repositories/notes-repository/notes-repository.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepositoryService]
})
export class NotesModule {}
