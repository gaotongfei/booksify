import { ipcRenderer } from "electron";
import { Bookshelf } from "./bookshelf";
import * as path from "path";
import * as os from 'os';

ipcRenderer.on('render-books', (event: any, data: any) => {
    let bookshelf = new Bookshelf('.bookshelf', path.join(os.homedir(), 'Documents', 'booksify-content'))
    bookshelf.loadBooks();
    console.log(data)
})