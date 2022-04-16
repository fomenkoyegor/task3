import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Note } from './note.entity';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column name: string;

  @HasMany(() => Note)
  notes: Note[];
}
