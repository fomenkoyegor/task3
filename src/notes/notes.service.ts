import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { INote } from './interfaces/INote';
import { NotesDto } from './dto/notes.dto';
import { ICategory } from './interfaces/ICategory';
import { ICategoryStat } from './interfaces/ICategoryStat';
import { parseDate } from './helpers';
import { Note } from './note.entity';
import { Category } from './category.entity';

@Injectable()
export class NotesService {
  // constructor(private prisma: PrismaService) {}
  constructor(
    @Inject('NoteRepository') private readonly noteRepository: typeof Note,
    @Inject('CategoryRepository')
    private readonly categoryRepository: typeof Category,
  ) {}

  public async notes(): Promise<Note[]> {
    return await this.noteRepository.findAll<Note>();
    // return this.prisma.note.findMany({
    //   include: { category: true },
    // });
  }

  public categories(): Promise<Category[]> {
    return this.categoryRepository.findAll<Category>();
    // return this.prisma.category.findMany({
    //   include: { notes: true },
    // });
  }

  public async categoriesStatistic() {
    // const categories = await this.categories();
    // const stats = categories.map((cat) => ({
    //   ...cat,
    //   active: cat.notes.filter((note) => !note.archived).length,
    //   archive: cat.notes.filter((note) => note.archived).length,
    // }));
    // return stats;
  }

  public note(id: number) {
    // const note = this.prisma.note.findFirst({ where: { id } });
    // if (!note) {
    //   throw new ForbiddenException('Access to resources denied');
    // }
    // return note;
  }

  public create(note: NotesDto) {
    // return this.prisma.note.create({
    //   data: {
    //     title: note.title,
    //     content: note.content,
    //     categoryId: note.categoryId,
    //     dates: parseDate(note.content).join(' '),
    //   },
    // });
  }

  public async remove(id: number) {
    // const note = await this.note(id);
    // await this.prisma.note.delete({ where: { id } });
    // return note;
  }

  public async update(id: number, noteDto: NotesDto) {
    // const note = await this.note(id);
    // return await this.prisma.note.update({
    //   where: { id },
    //   data: { ...noteDto },
    // });
  }

  public async archived(id: number) {
    // const note = await this.note(id);
    // return await this.prisma.note.update({
    //   where: { id },
    //   data: { ...note, archived: !note.archived },
    // });
  }
}
