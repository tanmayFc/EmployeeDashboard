import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoginState {
  name: string
  email: string
  pass: string
  isLogin: boolean
  token: string
}

const initialState: LoginState = {
  name: '',
  email: '',
  pass:'',
  isLogin: false,
  token:''
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setName : (state, action:PayloadAction<string>)=>{
      state.name = action.payload;
    },
    setEmail : (state, action:PayloadAction<string>)=>{
      state.email = action.payload;
    },
    setPass : (state, action:PayloadAction<string>)=>{
      state.pass = action.payload;
    },
    setLogin : (state, action:PayloadAction<boolean>)=>{
      state.isLogin = action.payload;
    },
    setToken : (state, action:PayloadAction<string>)=>{
      state.token = action.payload;
    }
  },
})

export const { setName, setEmail, setPass, setLogin, setToken } = LoginSlice.actions

export default LoginSlice.reducer