import { ipcRenderer } from "electron";
import { Bookshelf } from "./bookshelf";


// home button
const homeBtn = document.getElementById('home-btn')
homeBtn.addEventListener('click', () => {
    console.log('clicking')
    ipcRenderer.send('go-home')
})