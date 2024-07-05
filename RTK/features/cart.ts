import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customized: 0,
    searchString: "",
    filterStateData: {},
    utilityStateData: {},
    productData: [],
    columns: [],
    options: {},
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
    },
    setProductData: (state, action) => {
      state.productData = action.payload
    },
    setColumns: (state, action) => {
      state.columns = action.payload
    },
    setOptions: (state, action) => {
      state.options = action.payload
    },
  },
})

export const {setCustomized, setSearchString, setFilterStateData, setUtilityStateData, setProductData, setColumns, setOptions} = cart.actions;
export default cart.reducer