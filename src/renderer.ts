import { ipcRenderer, remote } from "electron"
import { Bookshelf } from "./models/bookshelf"

ipcRenderer.on("render-books", (event: any, data: any) => {
    const bookshelf = new Bookshelf(".bookshelf")
    const bookBlocks = bookshelf.loadBooks()
    for (const bookBlock of bookBlocks) {
        bookBlock.addEventListener("click", (e) => {
            const bookId = (e.target as HTMLElement).getAttribute("data-book-id")
            ipcRenderer.send("select-book-from-bookshelf", { bookId })
        })
    }
})

// create book button
const createBookBtn = document.getElementById("create-book")
createBookBtn.addEventListener("click", () => {
    ipcRenderer.send("show-create-book-window")
})
