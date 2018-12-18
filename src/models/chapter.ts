import db from "../db"

export class Chapter {
    public title: string
    public content: string
    public book_id: number
    public created_at: number
    public updated_at: number

    constructor(title: string, content: string, book_id: number, created_at: number, updated_at: number) {
        this.title = title
        this.content = content
        this.book_id = book_id
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export class ChapterModel {
    public static listChapters(bookId: number): Chapter[] {
        const chapters: Chapter[] = []
        const stmt = db.prepare("SELECT * FROM chapters WHERE book_id = ?")
        const rows = stmt.all(bookId)
        for (const row of rows) {
            const chapter = new Chapter(row.title, row.content, row.book_id, row.created_at, row.updated_at)
            chapters.push(chapter)
        }
        return chapters
    }

    public static createChapter(chapterData: { title: string, content: string, book_id: number }) {
        const currentTime = new Date().getTime()
        const stmt = db.prepare(`
            INSERT INTO chapters (title, content, book_id, created_at, updated_at)
            VALUES (@title, @content, @book_id, ?, ?)
        `)
        const info = stmt.run(chapterData, currentTime, currentTime)
        return info
    }

    public static updateChapter(chapterData: { chapterId: number, title: string, content: string}) {
        const chapterId = chapterData.chapterId
        const currentTime = new Date().getTime()
        const stmt = db.prepare(`
            UPDATE chapters SET title = ?, content = ?, updated_at = ? WHERE id = ?
        `)
        stmt.run(chapterData.title, chapterData.content, currentTime, chapterId)
    }

    public static deleteChapter(chapterId: number) {
        const stmt = db.prepare(`
            DELETE FROM chapters where id = ?
        `)
        stmt.run(chapterId)
    }
}
