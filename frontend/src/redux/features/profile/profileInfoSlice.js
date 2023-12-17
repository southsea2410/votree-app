import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: '',
    avatar: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    interest: '',
};

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState: initialState,
    reducers: {
        updateProfileInfo: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        }
    }
});

export const selectProfileInfo = (state) => state.profileInfo;
export default profileInfoSlice.reducer;
export const { updateProfileInfo } = profileInfoSlice.actions;
