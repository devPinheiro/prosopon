import './assets/main.css'

import { persistor, store } from './store'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading="...loading" persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
