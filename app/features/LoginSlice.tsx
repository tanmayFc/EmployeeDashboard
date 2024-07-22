import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoginState {
  email: string
  pass: string
  isLogin: boolean
}

const initialState: LoginState = {
  email: '',
  pass:'',
  isLogin: false
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail : (state, action:PayloadAction<string>)=>{
      state.email = action.payload;
    },
    setPass : (state, action:PayloadAction<string>)=>{
      state.pass = action.payload;
    },
    setLogin : (state, action:PayloadAction<boolean>)=>{
      state.isLogin = action.payload;
    }
  },
})

export const { setEmail, setPass, setLogin } = LoginSlice.actions

export default LoginSlice.reducer