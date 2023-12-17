import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const isSellerSlice = createSlice({
    name: 'isSeller',
    initialState: initialState,
    reducers: {
        updateIsSeller: (state, action) => action.payload
    }
});

export const selectIsSeller = (state) => state.isSeller;
export default isSellerSlice.reducer;
export const { updateIsSeller } = isSellerSlice.actions;
