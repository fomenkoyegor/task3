import { Injectable } from '@nestjs/common';
import {NotesRepositoryService} from "./repositories/notes-repository/notes-repository.service";
import {INote} from "./interfaces/INote";
import {NotesDto} from "./dto/notes.dto";
import {ICategory} from "./interfaces/ICategory";
import {ICategoryStat} from "./interfaces/ICategoryStat";

@Injectable()
export class NotesService {
    constructor(
        private notesRepository: NotesRepositoryService
    ) {
    }

    public notes():INote[]{
        return this.notesRepository.getNotes();
    }
    public categories():ICategory[]{
        return this.notesRepository.getCategories();
    }
    public categoriesStatistic():ICategoryStat[]{
        return this.notesRepository.getCategoriesWithActiveAndArchivedNotes();
    }
    public note(id:number):INote {
        return this.notesRepository.getNoteById(id);
    }
    public create(noteDTO:NotesDto):INote{
        return this.notesRepository.createNote(noteDTO)
    }
    public remove(id:number):INote{
        return this.notesRepository.deleteNoteById(id);
    }
    public update(id:number, noteDTO:NotesDto):INote{
        return this.notesRepository.updateNoteById(+id, noteDTO);
    }
    public archived(id:number):INote{
        return this.notesRepository.archiveNoteById(id);
    }
}
