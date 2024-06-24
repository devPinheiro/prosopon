import { combineReducers } from '@reduxjs/toolkit'
import songs from './slices/songSlice'

const appReducer = combineReducers({
  songs
})

export default appReducer
