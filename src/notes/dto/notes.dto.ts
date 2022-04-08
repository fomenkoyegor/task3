import {IsNotEmpty, IsDefined, IsNumber, Length, MinLength, MaxLength} from 'class-validator';
export class NotesDto {
    @IsDefined()
    @IsNotEmpty()
    @Length(6,12)
    readonly name: string;
    @IsDefined()
    @IsNotEmpty()
    @Length(6,50)
    @MinLength(6, {
        message: 'content is too short',
    })
    @MaxLength(50, {
        message: 'content is too long',
    })
    readonly content: string;
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly categoryId: number;
}