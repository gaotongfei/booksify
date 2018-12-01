import * as fs from 'fs';

import {Book} from './models/book'

export class Bookshelf {
    selector: string
    loadPath: string
    constructor(selector: string, loadPath: string) {
        this.selector = selector
        this.loadPath = loadPath
    }

    loadBooks() {
        this.loadBooksPrep()
        let books = this.fetchBooks()
        console.log(books)
        this.renderBooks(books)
        console.log('loading book')
        // this.renderBooks()
    }

    private fetchBooks(): Book[] {
        let books: Book[] = []
        fs.readdirSync(this.loadPath).forEach(file => {
            let book: Book = new Book(file)
            books.push(book)
        })
        return books
    }

    private renderBooks(books: Book[]) {
        let element = document.querySelector(this.selector);
        element.innerHTML = this.template(books)
        console.log(this.template(books))
    }

    private template(books: Book[]) {
        let temp = ""
        if (books.length == 0) {
            temp = "<div class='empty-bookshelf'>No book found</div>"
            return temp
        }
        for (let book of books) {
            temp += '<div class="book-block">' + 
                book.name
            '</div>'
        }
        return temp
    }

    private loadBooksPrep() {
        if (!fs.existsSync(this.loadPath)) {
            fs.mkdirSync(this.loadPath)
        }
    }

}