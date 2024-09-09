import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    token: string | null;
    userData: any;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, { payload }: PayloadAction<{ token: string; userData: any }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = payload.token;
            state.userData = payload.userData;
            localStorage.setItem('authToken', payload.token);
        },
        loginFailure: (state, { payload }: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = payload.error;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
} = authSlice.actions;

export default authSlice.reducer;
