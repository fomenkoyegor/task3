import {ICategory} from "../interfaces/ICategory";

export class Category implements ICategory {
    constructor(
        public id: number,
        public name: string
    ) {}
}