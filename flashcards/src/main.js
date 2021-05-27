const { app, BrowserWindow } = require('electron')
const path = require('path')

//try {
  require('electron-reloader')(module);
//} catch {}

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setMenu(null)
  win.webContents.openDevTools()

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})