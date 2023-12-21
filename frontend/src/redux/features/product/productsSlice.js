import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dictionary: {}
};

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        updateProduct: (state, action) => {
            const { id, updatedProduct } = action.payload;
            state.dictionary[id] = { ...state.dictionary[id], ...updatedProduct };
        },
        addProduct: (state, action) => {
            const { id, product } = action.payload;
            state.dictionary[id] = product;
        },
        deleteProduct: (state, action) => {
            const { id } = action.payload;
            delete state.dictionary[id];
        }
    }
});

export const selectProducts = (state) => state.products;
export default productsSlice.reducer;
export const { updateProduct, addProduct, deleteProduct } = productsSlice.actions;
