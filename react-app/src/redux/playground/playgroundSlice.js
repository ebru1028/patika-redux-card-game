import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const adapter = createEntityAdapter();

export const playgroundSelectors = adapter.getSelectors((state) => state.playground);

export const getAllCards = createAsyncThunk('cards/getCards', async () => {
    const res = await axios("http://localhost:3000/cards");
    return res.data;
});

const playgroundSlice = createSlice({
    name: 'cards',
    initialState: adapter.getInitialState(),
    reducers: {
    },

    extraReducers: {
        [getAllCards.fulfilled]: (state, action) => {
            adapter.addMany(state, action.payload);
        },
    },
});
export default playgroundSlice.reducer;