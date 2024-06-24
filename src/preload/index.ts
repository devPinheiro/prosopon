import { contextBridge, ipcRenderer } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electron', {
      startPresentation: () => ipcRenderer.send('start-presentation'),
      stopPresentation: () => ipcRenderer.send('stop-presentation'),
      ...electronAPI
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.electron.startPresentation = ipcRenderer.send('start-presentation')
  // @ts-ignore (define in dts)
  window.electron.stopPresentation = ipcRenderer.send('stop-presentation')
  // @ts-ignore (define in dts)
  window.api = api
}
