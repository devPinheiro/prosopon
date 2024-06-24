import { Link } from 'react-router-dom'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { setLyrics } from './store/slices/songSlice'
import { useDispatch } from 'react-redux'

function App(): JSX.Element {
  const dispatch = useDispatch()
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const handleStartPresentation = (): void => {
    window.electron.ipcRenderer.send('start-presentation'), 
    
    dispatch(setLyrics(lyrics))
  }

  const lyrics = [
    'Amazing grace! How sweet the sound',
    'That saved a wretch like me.',
    'I once was lost, but now am found;',
    'Was blind, but now I see.'
  ]

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleStartPresentation}
        >
          Start Presentation
        </button>

        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
        <div className="action">
          <Link to={'/presentation'}>Present</Link>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
