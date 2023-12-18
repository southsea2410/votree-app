import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

export const navBarStateSlice = createSlice({
    name: 'navBarState',
    initialState: initialState,
    reducers: {
        updateNavBarState: (state, action) => action.payload
    }
});

export const selectNavBarState = (state) => state.navBarState;
export default navBarStateSlice.reducer;
export const { updateNavBarState } = navBarStateSlice.actions;
