import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SongState = {
  lyrics: string[]
  currentLine: number
}

const initialState: SongState = {
  lyrics: [],
  currentLine: 0
}

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setLyrics: (state, action: PayloadAction<string[]>) => {
      state.lyrics = action.payload
      state.currentLine = 0
    },
    nextLine: (state) => {
      if (state.currentLine < state.lyrics.length - 1) {
        state.currentLine += 1
      }
    },
    prevLine: (state) => {
      if (state.currentLine > 0) {
        state.currentLine -= 1
      }
    }
  }
})

export const { setLyrics, nextLine, prevLine } = songSlice.actions

export default songSlice.reducer
