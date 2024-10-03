import './assets/main.css'

import { AppState, persistor, store } from './store'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useEffect } from 'react'

// import { app, ipcMain } from "electron";
// import { mainReduxBridge } from "reduxtron/main";

// const { unsubscribe } = mainReduxBridge(ipcMain, store);

// app.on("quit", unsubscribe);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = () => {
  // const dispatch = useDispatch()

  useEffect(() => {
    // Receive initial state from the main process
    window.electron.getInitialState().then((initialState) => {
      store.replaceReducer(() => initialState as AppState)
    })

    // Listen for state updates from the main process
    window.electron.onStateUpdate((state) => {
      store.replaceReducer(() => state as AppState)
    })
  }, [])

  // Dispatch actions
  // const sendAction = (action) => {
  //   window.electron.sendAction(action)
  //   dispatch(action)
  // }
  return (
    <Provider store={store}>
      <PersistGate loading="...loading" persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
