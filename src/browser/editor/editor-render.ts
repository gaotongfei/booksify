import { ipcRenderer } from "electron"
import {  ChapterModel, Chapter } from "../../models/chapter"
import store from "../../store"

class EditorRender {
    public bindAllEvents() {
        this.bindHomeBtn()
        this.loadChapters()
        this.bindDragDropAttachment()
        this.bindSaveBtn()
    }


    public bindHomeBtn() {
        const homeBtn = document.getElementById("home-btn")
        homeBtn.addEventListener("click", () => {
            ipcRenderer.send("go-home")
        })
    }

    public bindDragDropAttachment() {
        document.addEventListener("trix-attachment-add", (event: any) => {
            const attachment = event.attachment
            if (attachment.file) {
                return this.uploadAttachment(attachment)
            }
        })
    }

    public bindSaveBtn() {
        const saveBtn = document.getElementById("save-btn")
        saveBtn.addEventListener("click", () => {
            const title = (document.getElementById("chapter-input") as HTMLInputElement).value
            const content = (document.getElementById("trix-editor-input") as HTMLInputElement).value
            const bookId = store.get("current-book-id")
            const chapterId = store.get("current-chapter-id")

            if (chapterId !== undefined) {
                const chapterData = { title, content, chapterId }
                ipcRenderer.send("update-chapter", chapterData )
            } else {
                const chapterData = { title, content, book_id: bookId }
                ipcRenderer.send("create-chapter", chapterData)
            }
        })
    }

    public loadChapters() {
        document.addEventListener("DOMContentLoaded", () => {
            const bookId = 1
            const chapters: Chapter[] = ChapterModel.listChapters(bookId)
            const chaptersSection = document.getElementById("chapters-section")
            const chaptersElement = this.chaptersTemplate(chapters)
            for (const chapterElement of chaptersElement) {
                chapterElement.addEventListener("click", () => {
                    // do something later
                })
                chaptersSection.appendChild(chapterElement)
            }
        })
    }
    private uploadAttachment(attachment: any) {
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

    private chaptersTemplate(chapters: Chapter[]) {
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

}

const editor = new EditorRender()
editor.bindAllEvents()
