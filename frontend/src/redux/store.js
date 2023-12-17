import { configureStore } from '@reduxjs/toolkit';
import profileInfoReducer from './features/profile/profileInfoSlice';
import storeInfoReducer from './features/profile/storeInfoSlice';
import isLoggedInReducer from './features/account/isLoggedInSlice';
import isSellerReducer from './features/account/isSellerSlice';

export default configureStore({
    reducer: {
        profileInfo: profileInfoReducer,
        storeInfo: storeInfoReducer,
        isLoggedIn: isLoggedInReducer,
        isSeller: isSellerReducer,
    }
});
