import { configureStore } from '@reduxjs/toolkit';
import profileInfoReducer from './features/profileInfoSlice';

export default configureStore({
    reducer: {
        profileInfo: profileInfoReducer
    }
});
