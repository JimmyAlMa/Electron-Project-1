const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fileApi', {
    openFile: () => ipcRenderer.invoke('open-file'),
    saveFile: (text) => ipcRenderer.invoke('save-file', text) 
})