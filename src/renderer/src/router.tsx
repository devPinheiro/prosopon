import App from './App'
import PresentationViewer from './pages/presentation-viewer'
import { createHashRouter } from 'react-router-dom'

const router = createHashRouter([
  { path: '/', element: <App /> },
  {
    path: '/presentation',
    element: <PresentationViewer />
  }
])

export default router
