import { AxiosError } from "axios"
import { PayloadAction } from "@reduxjs/toolkit"

export interface ThunkResponse extends PayloadAction<any, string>{
  error: any
}

export const manageAxiosThunk = async ( axiosFn: ()=> Promise<any>, ThunkAPI: any ) => {
  try {
    return  await axiosFn()
  }catch (e) {
    const err = e as AxiosError
    if (!err.response) {

      return ThunkAPI.rejectWithValue({ error: err.code })
    }
    const message = (err.response.data as any).error
    return ThunkAPI.rejectWithValue({ error: { status: err.response.status,message } })
  }
}