import {createSlice} from '@reduxjs/toolkit';
import { sidebarRTK } from '@/Interfaces';

// this are the globally required variables, and this object is called a state
const initialState:sidebarRTK = {
    currentPage: 'myCart',
}

export const slice = createSlice({
  name: `slice`,
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload.currentPage;
    }
  }
})

export const {setCurrentPage} = slice.actions
export default slice.reducer