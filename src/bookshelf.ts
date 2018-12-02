import {Book, BookModel} from './models/book'

export class Bookshelf {
    selector: string
    constructor(selector: string) {
        this.selector = selector
    }

    loadBooks() {
        let books = this.fetchBooks()
        this.renderBooks(books)
    }

    private fetchBooks(): Book[] {
        let books = BookModel.listBooks();
        return books
    }

    private renderBooks(books: Book[]) {
        let element = document.querySelector(this.selector);
        element.innerHTML = this.template(books)
    }

    private template(books: Book[]) {
        let temp = ""
        if (books.length == 0) {
            temp = `
            <div class='empty-bookshelf'>
                <h1>Thanks for using Booksify</h1>
                There is no book found on local machine.
            </div>
            `
            return temp
        }
        for (let book of books) {
            temp += `<div class="book-block">${book.name}<img src='file:///Users/gao/Documents/Userpic.png' /> </div>`
        }
        return temp
    }
}