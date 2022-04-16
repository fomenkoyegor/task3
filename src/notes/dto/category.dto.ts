import { IsNotEmpty, IsDefined } from 'class-validator';

export class CategoryDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
}
