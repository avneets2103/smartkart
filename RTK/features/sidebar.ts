import {createSlice} from '@reduxjs/toolkit';
import { sidebarRTK } from '@/Interfaces';

// this are the globally required variables, and this object is called a state
const initialState:sidebarRTK = {
    currentPage: 'myCart',
    currentList: '',
}

export const slice = createSlice({
  name: `slice`,
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload.currentPage;
    },
    setCurrentList: (state, action) => {
        state.currentList = action.payload.currentList;
    }, 
  }
})

export const {setCurrentPage, setCurrentList} = slice.actions
export default slice.reducer