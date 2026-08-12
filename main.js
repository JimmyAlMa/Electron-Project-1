const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    win.loadFile('index.html')
}

ipcMain.handle('open-file', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Text Files', extensions: ['txt', 'json'] }]
    })

    if (result.canceled || !result.filePaths ||result.filePaths.length === 0) {
        return { canceled: true }
    }

    const filePath = result.filePaths[0]

    const dataFile = fs.readFileSync(filePath, 'utf-8')

    return { canceled: false, filePath, content: dataFile}
})

ipcMain.handle('save-file', async (event, savedText) => {
    const result = await dialog.showSaveDialog({
        title: "Save your file",
        defaultPath: 'new-file.txt',
        filters: [
            { name: 'Text File', extensions: ['txt']},
            { name: 'JSON File', extensions: ['json']}
        ]
    })

    if (result.canceled || !result.filePath) {
        return { success: false, reason: 'User Canceled'}
    }

    fs.writeFileSync(result.filePath, savedText, 'utf-8')

    return { success: true, filePath: result.filePath }
})

app.whenReady().then(createWindow)