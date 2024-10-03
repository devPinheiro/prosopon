import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import { resolveHtmlPath } from '../../src/utils'
import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  // persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import appReducer from '../renderer/src/store/rootReducers'
// import ElectronStore from 'electron-store'
// import createElectronStorage from 'redux-persist-electron-storage'
// import { persistor } from '../../src/renderer/src/store'

// Electron Store
// const store = new ElectronStore()

// const persistConfig = {
//   key: 'root',
//   storage: createElectronStorage({ electronStore: store })
// }

// const persistedReducer = persistReducer(persistConfig, appReducer)
const reduxStore = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore all actions that redux-persist has
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})
const persistor = persistStore(reduxStore)
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  //   mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }
  mainWindow.loadURL(resolveHtmlPath('/'))

  // Send the initial state to the renderer
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('persistor.getState() ====>', reduxStore.getState());
    
    mainWindow.webContents.send('redux-initial-state', persistor.getState())
  })
}

// function createPresentationWindow(): void {
//   // Create the presentation window.

// }

// Listen for actions from renderer processes
ipcMain.on('redux-action', (event, action) => {
  persistor.dispatch(action)
  // Broadcast the new state to all renderer processes
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.send('redux-state-update', persistor.getState())
  })
})

ipcMain.on('start-presentation', () => {
  const presentationWindow = new BrowserWindow({
    width: 900,
    height: 670,
    resizable: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      enableWebSQL: true
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (process.env.ELECTRON_RENDERER_URL_PRESENTATION) {
  presentationWindow.loadURL(resolveHtmlPath('/presentation'))
  // }
  // } else {
  //   presentationWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }
  presentationWindow.on('ready-to-show', () => {
    presentationWindow.show()
  })

  presentationWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  console.log('persistor.getState() ====>', reduxStore.getState());
})

// ipcMain.on('stop-presentation', () => {
//   if (presentationWindow) {
//     presentationWindow.close()
//     presentationWindow = null
//   }
// })

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
