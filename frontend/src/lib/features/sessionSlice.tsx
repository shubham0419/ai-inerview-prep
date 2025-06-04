import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SessionState = {
  currentSession: Session | null
  allSessions: Session[]
}

const initialState: SessionState = {
  currentSession: null,
  allSessions: [],
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentSession(state, action: PayloadAction<Session>) {
      state.currentSession = action.payload
    },
    clearCurrentSession(state) {
      state.currentSession = null
    },
    setAllSessions(state, action: PayloadAction<Session[]>) {
      state.allSessions = action.payload
    },
    clearAllSessions(state) {
      state.allSessions = []
    },
  },
})

export const {
  setCurrentSession,
  clearCurrentSession,
  setAllSessions,
  clearAllSessions,
} = sessionSlice.actions

export default sessionSlice.reducer