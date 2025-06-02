import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Import User type from types if needed
// import type { User } from '@/types/user'

type UserState = {
  user: User | null,
  loading:boolean
}

const initialState: UserState = {
  user: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    setAuthLoading(state,action:PayloadAction<boolean>){
      state.loading = action.payload
    }
  },
})

export const { setUser, clearUser,setAuthLoading } = userSlice.actions
export default userSlice.reducer