import {INote} from "../interfaces/INote";
import {uuid, parseDate} from '../helpers'

export class Note implements INote{
    public id = uuid();
    public created = new Date();
    public updated = new Date();
    public dates = [];
    public archived = false;
    constructor(
       public name: string,
       public content: string,
       public categoryId: number,
    ){
        this.dates = parseDate(this.content);
    }
}