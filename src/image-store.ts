import * as fs from "fs"
import * as path from "path"
import * as uuid from "uuid/v4"
const pf = require("platform-folders")

export class ImageStore {
    public base64Data: string
    public image: string
    public extension: string
    public imagesStoreFolder: string
    public window: Electron.BrowserWindow

    constructor(window: Electron.BrowserWindow, base64Data: string, extension: string) {
        this.base64Data = base64Data
        this.image = this.base64Data.replace(/^data:image\/\w+;base64,/, "")

        this.extension = extension
        this.window = window

        const dataHomePath = pf.getDataHome()
        this.imagesStoreFolder = path.join(dataHomePath, "booksify", "image-store")

        this.initImageStoreFolder()
    }

    public saveToDisk() {
        const imageName = this.imageUuid()
        const imageFullPath = path.join(this.imagesStoreFolder, imageName) + `.${this.extension}`
        fs.writeFile(imageFullPath, this.image, {encoding: "base64"}, () => {
            this.window.webContents.send("image-uploaded", {
                imageUrl: imageFullPath,
            })
        })
    }

    private initImageStoreFolder() {
        if (!fs.existsSync(this.imagesStoreFolder)) {
            fs.mkdirSync(this.imagesStoreFolder)
        }
    }

    private imageUuid(): string {
        return uuid()
    }
}
