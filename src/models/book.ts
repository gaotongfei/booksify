import db from "../db"

export class Book {
    public id: number
    public name: string
    public description: string
    public cover_pic: string
    public created_at: number
    public updated_at: number

    constructor(id: number, name: string, description: string, cover_pic: string, created_at: number, updated_at: number) {
        this.id = id
        this.name = name
        this.description = description
        this.created_at = created_at
        this.updated_at = updated_at
        this.cover_pic = cover_pic
    }
}

export class BookModel {
    public static getBook(id: number) {
        let book: Book
        const stmt = db.prepare("SELECT * FROM books where id = ?")
        const row = stmt.get(id)
        book = new Book(
            row.id, row.name, row.description,
            row.cover_pic, row.created_at, row.updated_at)
        return book
    }

    public static listBooks(): Book[] {
        const books: Book[] = []
        const stmt = db.prepare("SELECT * FROM books")
        const rows = stmt.all()
        rows.forEach((row: any) => {
            const book: Book = new Book(
                row.id, row.name, row.description,
                row.cover_pic, row.created_at, row.updated_at)
            books.push(book)
        })
        return books
    }

    public static createBook(bookData: {name: string, description: string, cover_pic: string}): number {
        const currentTime = new Date().getTime()
        const stmt = db.prepare(`
            INSERT INTO books (name, description, cover_pic, created_at, updated_at)
            VALUES (@name, @description, @cover_pic, ?, ?)
            `)
        const result = stmt.run(currentTime, currentTime, bookData)
        return result.lastInsertRowid
    }

}
