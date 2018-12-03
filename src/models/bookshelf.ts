import {Book, BookModel} from "./book"

export class Bookshelf {
    public selector: string
    constructor(selector: string) {
        this.selector = selector
    }

    public loadBooks() {
        const books = this.fetchBooks()
        this.renderBooks(books)
    }

    private fetchBooks(): Book[] {
        const books = BookModel.listBooks()
        return books
    }

    private renderBooks(books: Book[]) {
        const element = document.querySelector(this.selector)
        element.innerHTML = this.template(books)
    }

    private template(books: Book[]) {
        let temp = ""
        if (books.length === 0) {
            temp = `
            <div class='empty-bookshelf'>
                <h1>Thanks for using Booksify</h1>
                There is no book found on local machine.
            </div>
            `
            return temp
        }
        for (const book of books) {
            temp += `<div class="book-block">${book.name}<img src='file:///Users/gao/Documents/Userpic.png' /> </div>`
        }
        return temp
    }
}
