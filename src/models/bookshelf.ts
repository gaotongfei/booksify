import {Book, BookModel} from "./book"

export class Bookshelf {
    public selector: string
    constructor(selector: string) {
        this.selector = selector
    }

    public loadBooks() {
        const books = this.fetchBooks()
        return this.renderBooks(books)
    }

    private fetchBooks(): Book[] {
        const books = BookModel.listBooks()
        return books
    }

    private renderBooks(books: Book[]) {
        const element = document.querySelector(this.selector)
        const bookBlocks = this.template(books)
        for (const bookBlock of bookBlocks) {
            element.appendChild(bookBlock)
        }
        return bookBlocks
    }

    private template(books: Book[]) {
        const bookBlocks = []
        if (books.length === 0) {
            const divElem = document.createElement("div")
            divElem.setAttribute("class", "empty-bookshelf")
            const headerElem = document.createElement("H1")
            const headerTextElem = document.createTextNode("Thanks for using Booksify")
            headerElem.appendChild(headerTextElem)
            divElem.appendChild(headerElem)
            divElem.appendChild(document.createTextNode("There is no book found on local machine."))
            bookBlocks.push(divElem)
        } else {
            for (const book of books) {
                const divElem = document.createElement("div")
                divElem.setAttribute("data-book-id", String(book.id))
                divElem.setAttribute("class", "book-block")
                divElem.style.backgroundImage = `url(${book.cover_pic})`
                bookBlocks.push(divElem)
            }
        }

        return bookBlocks
    }
}
