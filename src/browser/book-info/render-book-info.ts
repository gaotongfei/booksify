import { ipcRenderer } from "electron"

const confirmBtn = document.getElementById("confirm")
const closeBtn = document.getElementById("close")
closeBtn.addEventListener("click", () => {
    ipcRenderer.send("close-book-info-modal")
})

confirmBtn.addEventListener("click", () => {
    const bookName = (document.getElementById("book-name") as HTMLInputElement).value
    const bookDescription = (document.getElementById("book-description") as HTMLInputElement).value
    const imageSource = (document.getElementById("book-cover-pic") as HTMLInputElement).src
    ipcRenderer.send("submit-book-info", {name: bookName, description: bookDescription, cover_pic: imageSource})
})


const selectCoverPicBtn = document.getElementById("select-cover-pic")
selectCoverPicBtn.addEventListener("click", (e) => {
    e.preventDefault()
    ipcRenderer.send("popup-file-dialog")
})

const bookCoverPic = document.getElementById("book-cover-pic")
ipcRenderer.on("book-cover-pic", (event: any, data: any) => {
    (bookCoverPic as HTMLImageElement).src = data
})
