import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { NotesDto } from './dto/notes.dto';
import { parseDate } from './helpers';
import { Note } from './models/note.entity';
import { Category } from './models/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NoteRepository') private readonly noteRepository: typeof Note,
    @Inject('CategoryRepository')
    private readonly categoryRepository: typeof Category,
  ) {}

  public async notes(): Promise<Note[]> {
    return await this.noteRepository.findAll<Note>();
  }

  public categories(): Promise<Category[]> {
    return this.categoryRepository.findAll<Category>({
      include: Note,
    });
  }

  public async categoriesStatistic() {
    const categories = await this.categories();
    const stats = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      active: cat.notes.filter((note) => !note.archived).length,
      archive: cat.notes.filter((note) => note.archived).length,
    }));
    return stats;
  }

  public note(id: number): Promise<Note> {
    const note = this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new ForbiddenException('Access to resources denied');
    }
    return note;
  }

  public create(note: NotesDto): Promise<Note> {
    return this.noteRepository.create({
      title: note.title,
      content: note.content,
      categoryId: note.categoryId,
      dates: parseDate(note.content).join(' '),
    });
  }

  public async remove(id: number): Promise<Note> {
    const note = await this.note(id);
    await this.noteRepository.destroy({ where: { id } });
    return note;
  }

  public async update(id: number, noteDto: NotesDto) {
    return await this.noteRepository.upsert({
      id,
      ...noteDto,
      dates: parseDate(noteDto.content).join(' '),
    });
  }

  public async archived(id: number) {
    const note = await this.note(id);
    return await this.noteRepository.upsert({
      id,
      title: note.title,
      content: note.content,
      dates: note.dates,
      archived: !note.archived,
      categoryId: note.categoryId,
    });
  }
}
