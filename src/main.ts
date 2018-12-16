import { app, BrowserWindow, dialog, ipcMain } from "electron"
import Store = require("electron-store")
import * as fs from "fs"
import * as path from "path"
import { BookModel } from "./models/book"
import { ImageStore } from "./image-store"

const { requireTaskPool } = require("electron-remote")
const ChapterModel = requireTaskPool(require.resolve("./models/chapter"))

const store = new Store()

let mainWindow: Electron.BrowserWindow
let child: Electron.BrowserWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        backgroundColor: "#ffffff",
        title: "Booksify",
        center: true,
    })
    mainWindow.maximize()


    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../src/index.html"))


    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("render-books")
    })

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
        child = null
    })

    ipcMain.on("show-create-book-window", (event: any, arg: any) => {
        child = new BrowserWindow({
            parent: mainWindow,
            modal: true,
            show: false,
            width: 600,
            height: 750,
            center: true,
        })
        child.loadFile(path.join(__dirname, "../src/browser/book-info/book-info.html"))
        child.once("ready-to-show", () => {
            child.show()
        })
    })

    ipcMain.on("close-book-info-modal", () => {
        child.close()
    })

    ipcMain.on("submit-book-info", (event: any, data: {name: string, description: string, cover_pic: string}) => {
        const bookId = BookModel.createBook(data)
        child.close()
        mainWindow.loadFile(path.join(__dirname, "../src/browser/editor/editor.html"))
        store.set("current-book-id", bookId)
    })

    ipcMain.on("popup-file-dialog", () => {
        dialog.showOpenDialog({
            properties: ["openFile", "openDirectory"],
            filters: [{ name: "Images", extensions: ["jpg", "png"] }],
        }, (filePath, bookmark) => {
            if (filePath && filePath.length > 0) {
                const imgBase64 = fs.readFileSync(filePath[0]).toString("base64")
                const imgSource = "data:image/png;base64," + imgBase64
                child.webContents.send("book-cover-pic", imgSource)
            }
        })
    })

    ipcMain.on("save-chapter", (event: any, data: any) => {
        ChapterModel.createChapter(data)
    })

    ipcMain.on("go-home", () => {
        mainWindow.loadFile(path.join(__dirname, "../src/index.html"))
    })

    ipcMain.on("select-book-from-bookshelf", (event: any, data: any) => {
        mainWindow.loadFile(path.join(__dirname, "../src/browser/editor/editor.html"))
        store.set("current-book-id", data.bookId)
    })

    ipcMain.on("save-image", (event: any, data: any) => {
        const imageStore = new ImageStore(mainWindow, data.imageData, data.extension)
        imageStore.saveToDisk()
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
