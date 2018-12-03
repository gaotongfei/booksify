import { ipcRenderer } from "electron"
import {  ChapterModel, Chapter } from "../../models/chapter"


// home button
const homeBtn = document.getElementById("home-btn")
homeBtn.addEventListener("click", () => {
    ipcRenderer.send("go-home")
})


const chaptersTemplate = (chapters: Chapter[]) => {
    const chaptersElement = []
    if (chapters.length > 0)  {
        for (const chapter of chapters) {
            const chapterElement = document.createElement("div")
            chapterElement.setAttribute("class", "chapter-title")
            chapterElement.appendChild(document.createTextNode(chapter.title))
            chaptersElement.push(chapterElement)
        }
    } else {
        const emptyChapterElement = document.createTextNode("Untitled")
        chaptersElement.push(emptyChapterElement)
    }

    return chaptersElement
}


document.addEventListener("DOMContentLoaded", () => {
    const bookId = 1
    const chapters: Chapter[] = ChapterModel.listChapters(bookId)
    const chaptersSection = document.getElementById("chapters-section")
    const chaptersElement = chaptersTemplate(chapters)
    for (const chapterElement of chaptersElement) {
        chapterElement.addEventListener("click", () => {
            // do something later
        })
        chaptersSection.appendChild(chapterElement)
    }
})

