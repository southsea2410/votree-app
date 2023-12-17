import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    storeEmail: '',
    storeLocation: '',
    storeName: '',
    storePhoneNumber: ''
};

export const storeInfoSlice = createSlice({
    name: 'storeInfo',
    initialState: initialState,
    reducers: {
        updateStoreInfo: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const selectStoreInfo = (state) => state.storeInfo;
export default storeInfoSlice.reducer;
export const { updateStoreInfo } = storeInfoSlice.actions;
