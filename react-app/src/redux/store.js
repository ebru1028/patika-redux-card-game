import { configureStore } from '@reduxjs/toolkit';

import playgroundSlice from './playground/playgroundSlice';

export const store = configureStore({
    reducer: {
       playground: playgroundSlice,
    }
});