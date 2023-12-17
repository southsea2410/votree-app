import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: '',
    userName: '',
    avatar: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    interest: '',
    isLoggedIn: false,
    storeEmail: '',
    storeLocation: '',
    storeName: '',
    storePhoneNumber: ''
};

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState: initialState,
    reducers: {
        updateProfileInfo: (state, action) => {
            return action.payload;
        }
    }
});

export const selectProfileInfo = (state) => state.profileInfo;
export default profileInfoSlice.reducer;
export const { updateProfileInfo } = profileInfoSlice.actions;
