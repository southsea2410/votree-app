import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState: initialState,
    reducers: {
        updateIsLoggedIn: (state, action) => action.payload
    }
});

export const selectIsLoggedIn = (state) => state.isLoggedIn;
export default isLoggedInSlice.reducer;
export const { updateIsLoggedIn } = isLoggedInSlice.actions;
