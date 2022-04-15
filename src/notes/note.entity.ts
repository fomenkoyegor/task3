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
import { Category } from './category.entity';

@Table({ tableName: 'notes' })
export class Note extends Model<Note> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column title: string;

  @Column content: string;

  @Column archived: boolean;
}
