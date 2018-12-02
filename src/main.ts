import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import { BookModel } from "./models/book";
let mainWindow: Electron.BrowserWindow;
let child: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: '#ffffff',
    width: 1000,
    height: 800,
    title: 'Booksify',
    center: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../src/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('render-books');
  })

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  ipcMain.on('create-book', (event: any, arg: any) => {
    child = new BrowserWindow({
      parent: mainWindow, 
      modal: true,
      show: false,
      width: 600,
      height: 750,
      center: true })
    child.loadFile(path.join(__dirname, "../src/book-info.html"))
    child.once('ready-to-show', () => {
      child.show()
    })
    // mainWindow.loadFile(path.join(__dirname, '../src/editor.html'))
  })

  ipcMain.on('close-book-info-modal', (event: any, data: any) => {
    child.close()
  })

  ipcMain.on('submit-book-info', (event: any, data: any) => {
    BookModel.createBook(data)
    child.close()
  })

  ipcMain.on('popup-file-dialog', (event: any, data: any) => {
    dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
  })

  ipcMain.on('go-home', () => {
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'))
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});