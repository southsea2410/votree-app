import { createSlice } from '@reduxjs/toolkit';
import { fieldNames } from '../../../data';

const initialState = fieldNames;

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState: initialState,
    reducers: {}
});

export const selectProfileInfo = (state) => state.profileInfo;
export default profileInfoSlice.reducer;
export const { getProfileInfoSlice } = profileInfoSlice.actions;
