import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null, // User starts as null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Store user data
        },
        clearUser: (state) => {
            state.user = null; // Clear user data
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
