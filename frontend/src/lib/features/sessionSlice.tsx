import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SessionState = {
  currentSession: Session | null
  allSessions: Session[],
  deleteCount:number
}

const initialState: SessionState = {
  currentSession: null,
  allSessions: [],
  deleteCount:0
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
    setDeleteCount(state){
      state.deleteCount++
    }
  },
})

export const {
  setCurrentSession,
  clearCurrentSession,
  setAllSessions,
  clearAllSessions,
  setDeleteCount
} = sessionSlice.actions

export default sessionSlice.reducer