import db from '../db';

export class Book {
    name: string
    description: string
    cover_pic: string
    created_at: number
    updated_at: number

    constructor(
        name: string, description: string,
        cover_pic: string, created_at: number, updated_at: number) {

        this.name = name
        this.description = description
        this.created_at = created_at
        this.updated_at = updated_at
        this.cover_pic = cover_pic
    }
}

export class BookModel {
    static getBook(id: number) {
        let book: Book
        const stmt = db.prepare('SELECT * FROM books where id = ?')
        const row = stmt.get(id)
        book = new Book(
            row.name, row.description,
            row.cover_pic, row.created_at, row.updated_at)
        return book;
    }

    static listBooks(): Book[] {
        let books: Book[] = []
        const stmt = db.prepare('SELECT * FROM books')
        const rows = stmt.all()
        rows.forEach((row: any) => {
            let book: Book = new Book(
                row.name, row.description, row.cover_pic,
                row.created_at, row.updated_at)
            books.push(book)
        });
        return books;
    }

    static createBook(bookData: {name: string, description: string, cover_pic: string}) {
        let currentTime = new Date().getTime()
        const stmt = db.prepare(`
            INSERT INTO books (name, description, cover_pic, created_at, updated_at)
            VALUES (@name, @description, @cover_pic, ?, ?)
            `)
        stmt.run(currentTime, currentTime, bookData)
    }

}
