import {ICategory} from "./ICategory";

export interface ICategoryStat extends ICategory{
    active: number;
    archived: number
}