export interface INote {
  id?: number;
  name: string;
  content: string;
  categoryId: number;
  dates?: Date[];
  created?: Date;
  updated?: Date;
  archived?: boolean;
}
