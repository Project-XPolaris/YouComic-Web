import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    },
    backgroundColor: '#2e2c29',
    darkTheme: true,
    title: 'YouComic Supervisor',
    width: 1700,
    frame: false,
    minWidth:1300,
    minHeight:900
  });
  if (process.env.NODE_ENV === 'development') {
    if (process.env.DEV_TOOLS) {
      mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL('http://localhost:8000/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // mainWindow.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
