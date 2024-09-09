import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../services";
import { loginSuccess, loginFailure } from "./authSlice";
import { saveMessage } from "../../common";

interface LoginCredentials {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { dispatch }) => {
        try {
            const res = await apiCall({
                path: 'login',
                method: 'post',
                body: credentials,
            });
            console.log(res)
            if (res.success) {
                dispatch(loginSuccess({ token: res.token, userData: res.user }));
                const data = {
                    message: "Login successfully",
                    type: "success",
                }
                dispatch(saveMessage(data));
                return res;
            } else {
                dispatch(loginFailure({ error: res.error }));
                const data = {
                    message: res.message,
                    type: "error",
                }
                dispatch(saveMessage(data));
                return res;
            }
        } catch (error) {
            dispatch(loginFailure({ error: 'An unexpected error occurred' }));
            throw error;
        }
    }
);
