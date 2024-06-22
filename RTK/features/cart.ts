import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customized: 0,
    searchString: ""
}

export const cart = createSlice({
  name: `cart`,
  initialState,
  reducers: {
    setCustomized: (state, action) => {
      state.customized = action.payload
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload
    }
  }
})

export const {setCustomized, setSearchString} = cart.actions
export default cart.reducer