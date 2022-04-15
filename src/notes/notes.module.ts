import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { categoryProviders, noteProviders } from './note.providers';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [NotesService, ...noteProviders, ...categoryProviders],
})
export class NotesModule {}
