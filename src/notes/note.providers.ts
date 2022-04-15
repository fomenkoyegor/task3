import { Note } from './note.entity';
import { Category } from './category.entity';

export const noteProviders = [
  {
    provide: 'NoteRepository',
    useValue: Note,
  },
];

export const categoryProviders = [
  {
    provide: 'CategoryRepository',
    useValue: Category,
  },
];
