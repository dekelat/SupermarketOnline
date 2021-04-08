export class Product {
    public constructor(
        public id?: number,
        public name?: string,
        public categoryId?: number,
        public unitPrice?: number,
        public imageUrl?: string
    ) { }
}