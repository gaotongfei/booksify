import { ipcRenderer } from "electron";

let confirmBtn = document.getElementById('confirm')
let closeBtn = document.getElementById('close')
closeBtn.addEventListener('click', () => {
    ipcRenderer.send('close-book-info-modal')
})

confirmBtn.addEventListener('click', () => {
    let bookName = (<HTMLInputElement>document.getElementById('book-name')).value
    let bookDescription = (<HTMLInputElement>document.getElementById('book-description')).value
    ipcRenderer.send('submit-book-info', {name: bookName, description: bookDescription})
})


let selectCoverPicBtn = document.getElementById('select-cover-pic')
selectCoverPicBtn.addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.send('popup-file-dialog')
})

let bookCoverPic = document.getElementById('book-cover-pic')
ipcRenderer.on('book-cover-pic', (event: any, data: any) => {
    (<HTMLImageElement>bookCoverPic).src = data
})