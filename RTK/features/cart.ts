import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customized: 0,
    searchString: "",
    filterStateData: {},
    utilityStateData: {},
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
    },
    setFilterStateData: (state, action) => {
      state.filterStateData = action.payload
    },
    setUtilityStateData: (state, action) => {
      state.utilityStateData = action.payload
    }
  }
})

export const {setCustomized, setSearchString, setFilterStateData, setUtilityStateData} = cart.actions;
export default cart.reducer