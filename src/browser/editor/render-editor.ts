import { ipcRenderer } from "electron"
import { ChapterModel, Chapter } from "../../models/chapter"

// home button
const homeBtn = document.getElementById("home-btn")
homeBtn.addEventListener("click", () => {
    ipcRenderer.send("go-home")
})


ipcRenderer.on("render-chapters", (bookId: number) => {
    const chapters: Chapter[] = ChapterModel.listChapters(bookId)
    const chaptersSection = document.getElementById("chapters-section")
    chaptersSection.innerHTML = chaptersTemplate(chapters)
})

const chaptersTemplate = (chapters: Chapter[]) => {
    let template = ""
    for (const chapter of chapters) {
        template += `<div class="chapter-title">${chapter.title}</div>`
    }
    return template
}
