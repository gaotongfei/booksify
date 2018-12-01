import db from '../db';
import { create } from 'domain';

export class Book {
    name: string
    description: string
    created_at: number
    updated_at: number

    constructor(name: string, description: string, created_at: number, updated_at: number) {
        this.name = name
        this.description = description
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export class BookModel {
    static getBook(id: number) {
        let book: Book
        db.get('SELECT * FROM books where id = ?', id, (err: any, row: any) => {
            book = new Book(row.name, row.description, row.created_at, row.updated_at)
        })
        return book;
    }

    static listBooks() {
        let books: Book[] = []
        db.all('SELECT * FROM books', (err: any, rows: any) => {
            if (err) throw err;
            rows.forEach((row: any) => {
                let book: Book = new Book(row.name, row.description, row.created_at, row.updated_at)
                books.push(book)
            });
        })
        return books;
    }

}
