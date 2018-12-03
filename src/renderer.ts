import { ipcRenderer, remote } from "electron"
import { Bookshelf } from "./models/bookshelf"

ipcRenderer.on("render-books", (event: any, data: any) => {
    const bookshelf = new Bookshelf(".bookshelf")
    bookshelf.loadBooks()
})

// create book button
const createBookBtn = document.getElementById("create-book")
createBookBtn.addEventListener("click", () => {
    ipcRenderer.send("create-book")
})

