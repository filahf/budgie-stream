const { app, BrowserWindow, Menu, Tray } = require('electron');
//const { autoUpdater } = require('electron-updater');
const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');
var ip = require('ip');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  // Hide menubar
  win.removeMenu();

  // and load the index.html of the app.
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools();
  }

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  win.on('minimize', (e) => {
    e.preventDefault();
    win.hide();
  });

  win.on('close', (e) => {
    if(!app.isQuiting){
      e.preventDefault();
      win.hide();
    }

    return false;
  });

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: function() {
        win.show();
    }},
    {
      label: 'Quit',
      click: function() {
        app.isQuiting = true;
        app.quit();
    }}
  ]);

  var tray = new Tray(path.join(__dirname, 'icon.png'));
  tray.setToolTip('Budgie Stream');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    win.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('appInfo', (event) => {
  event.sender.send('appInfo', {
    ip: ip.address(),
    appVersion: app.getVersion(),
  });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

/* autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
}); */

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require('./server/index.js');
require('./server/sonosUtils');
