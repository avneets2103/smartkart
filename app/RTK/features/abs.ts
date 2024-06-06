import {createSlice} from '@reduxjs/toolkit';

// this are the globally required variables, and this object is called a state
const initialState = {
    // key: value
}

export const slice = createSlice({
  name: `slice`,
  initialState,
  reducers: {
    functionName: (state, action) => {
      // some function which is gonna be avalaible and has direct access to the initialState
    }
  }
})

export const {functionName} = slice.actions
export default slice.reducer