import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { nextLine, prevLine } from '@renderer/store/slices/songSlice'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../store'
import { Link } from 'react-router-dom'
import React from 'react'

const PresentationViewer: React.FC = () => {
  const { lyrics, currentLine } = useSelector((state: AppState) => state.songs)
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-3xl">
      <TransitionGroup>
        <CSSTransition key={currentLine} timeout={500} classNames="fade">
          <div>{lyrics[currentLine]}</div>
        </CSSTransition>
      </TransitionGroup>

      <div className="action">
        <div className="action">
          <span onClick={() => dispatch(prevLine())}>Previous</span>
        </div>
        <div className="action">
          <span onClick={() => dispatch(nextLine())}>Next</span>
        </div>
      </div>
      <div className="action">
        <Link to={'/'}>Home</Link>
      </div>
    </div>
  )
}

export default PresentationViewer
