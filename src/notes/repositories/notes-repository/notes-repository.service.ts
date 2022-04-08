import { Injectable } from '@nestjs/common';
import {INote} from "../../interfaces/INote";
import {ICategory} from "../../interfaces/ICategory";
import {Category} from "../../models/Category";
import {Note} from "../../models/Note";
import {BehaviorSubject} from "rxjs";
import {NotesDto} from "../../dto/notes.dto";
import {parseDate} from "../../helpers";
import {ICategoryStat} from "../../interfaces/ICategoryStat";

export interface InitialState {
    notes: INote[],
    categories: ICategory[]
}
export const initialState:InitialState = {
  categories:[
      new Category(1, "Task"),
      new Category(2, "Random Thought"),
      new Category(3, "Idea"),
      new Category(4, "Quote"),
  ],
  notes:[
      new Note('Shopping list', 'Your task is to create a notes app in JS as a web app. Users can add, edit and remove notes.', 1),
      new Note('list', 'Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 03/05/2021, I moved it from 05/05/2021” the dates column is “30/05/2021, 05/05/2021”', 2),
      new Note('lolo', 'List of notes is displayed in a form of table (HTML representation may vary: table, divs etc). The columns 12.12.22   05.04.08 are time of creation, note content, note category. Categories are predefined: “Task”, “Random Thought”, “Idea”', 3),
      new Note('lol', 'Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” the dates column is “3/5/2021, 5/5/2021”', 4),
      new Note('react', 'Users can archive notes. Archived notes are not shown in the notes list. Users can view archived notes and un archive them.', 1),
      new Note('vue', 'There should also be a summary table which counts notes by categories: separately for active and archived. The table is updated whenever users perform some action on notes. The summary table is shown on the same page as the notes table.', 2),
      new Note('angular', 'There is no need to implement data storage. Simply create a JS variable which stores the data and pre populate it with 7 notes so that they are shown when the page is reloaded.', 3),
      new Note('laravel', 'The goal of the task is to let you get better acquainted with the JavaScript language and browser DOM API. If you don’t know some of the APIs needed for the task, you might use these resources as references:', 4),
  ]
};

@Injectable()
export class NotesRepositoryService {

    private state$: BehaviorSubject<InitialState> = new BehaviorSubject<InitialState>(initialState);

    public getNotes = (): INote[] => {
        const state = this.state$.value;
        return state.notes;
    }

    public getCategories = (): ICategory[] => {
        const state = this.state$.value;
        return state.categories;
    }

    private joinNotes = (cat:ICategory):ICategoryStat => {
        const state = this.state$.value;
        return {
            ...cat,
            active: state.notes.filter(note => note.categoryId === cat.id && !note.archived).length,
            archived: state.notes.filter(note => note.categoryId === cat.id && note.archived).length
        }
    };

    public getCategoriesWithActiveAndArchivedNotes = ():ICategoryStat[] => {
        const state = this.state$.value;
        const {categories} = state;
        return categories.map(this.joinNotes);
    }

    public getNoteById = (id:number):Note => {
        const state = this.state$.value;
        return <Note>state.notes.find(note => note.id === id);
    }

    public createNote = (noteDTO:NotesDto) : INote => {
        const note = new Note(
            noteDTO.name,
            noteDTO.content,
            noteDTO.categoryId
        );
        const state = this.state$.value;
        state.notes = [...state.notes, note];
        this.state$.next(state);
        return note;
    }

    public deleteNoteById = (id:number) :INote => {
        const note = this.getNoteById(id);
        const state = this.state$.value;
        state.notes = [...state.notes].filter(note => note.id !== id);
        this.state$.next(state);
        return note;
    }

    public archiveNoteById = (id: number): INote => {
        const note = this.getNoteById(id);
        const updatedNote = {...note,archived: !note.archived};
        const state = this.state$.value;
        state.notes = [...state.notes].map(n => n.id === note.id ? updatedNote : n);
        this.state$.next(state);
        return updatedNote;
    }

    public updateNoteById = (id:number, noteDTO: NotesDto):INote => {
        const note = this.getNoteById(id);
        const name = noteDTO.name ?? note.name;
        const content = noteDTO.content ?? note.content;
        const categoryId = noteDTO.categoryId ?? note.categoryId;
        const dates = parseDate(content);
        const updatedNote = {...note,name,content,categoryId,dates};
        const state = this.state$.value;
        state.notes = [...state.notes].map(n => n.id === note.id ? updatedNote : n);
        this.state$.next(state);
        return updatedNote;
    }
}
