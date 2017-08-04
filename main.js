const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    win = new BrowserWindow({width: 800, height: 450, minHeight: 144, minWidth: 256, frame: false, alwaysOnTop: true});
    win.setAspectRatio(16/9, [0, 0]);
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

// win.webContents.openDevTools()
// win.setAspectRatio(16/9[0, 40]);

win.on('closed', () => {
    win = null;
})
win.on('resize', () => {
    win.setAspectRatio(16/9, [0, 0]);
})
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})