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

const uploadAttachment = (attachment: any) => {
    const file = attachment.file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        const imageData = reader.result
        const extension = attachment.getExtension()

        ipcRenderer.send("save-image", { imageData, extension })
    }

    reader.onerror = (e) => {
        console.log(e)
    }

    ipcRenderer.on("image-uploaded", (event: any, data: any) => {
        attachment.setAttributes({
            url: data.imageUrl,
            href: data.imageUrl,
        })
    })
}

document.addEventListener("trix-attachment-add", (event: any) => {
    const attachment = event.attachment
    if (attachment.file) {
        return uploadAttachment(attachment)
    }
})
