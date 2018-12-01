import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as os from 'os';
import {Bookshelf} from './bookshelf'


let mainWindow: Electron.BrowserWindow;
let ipc: Electron.IpcMain;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: '#ffffff',
    // transparent: true,
    width: 1000,
    height: 800,
    title: 'Booksify',
    center: true,
    titleBarStyle: 'hiddenInset'
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../src/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('render-books','This is a test');
  })

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
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