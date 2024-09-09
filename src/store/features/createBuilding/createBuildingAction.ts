import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../../services";
import { saveBuilding, getBuildingSuccess, getBuildingFailure, getBuildingByIdSuccess, getBuildingByIdFailure, deleteBuildingFailure } from "./createBuildingSlice";
import { saveMessage } from "../../common";

interface CreateBuildingParams {
    name: string;
    token: string | null;
}

export const createBuilding = createAsyncThunk(
    'building/create',
    async ({ name, token }: CreateBuildingParams, { dispatch }) => {
        try {
            const res = await apiCall({
                path: 'create-building',
                method: 'post',
                body: { name },
                token: token,
            });
            console.log(res)
            if (res.success) {
                dispatch(saveBuilding(res.building));
                const data = {
                    message: "Create Building successfully",
                    type: "success",
                }
                dispatch(saveMessage(data));
                return res;
            } else {
                const data = {
                    message: res?.message,
                    type: "error",
                }
                dispatch(saveMessage(data));
                return res;
            }
        } catch (error) {
            const data = {
                message: error,
                type: "error",
            }
            dispatch(saveMessage(data));
            throw error;
        }
    }
);


interface GetBuildingParams {
    token: string | null;
}

export const getBuilding = createAsyncThunk(
    'building/get',
    async ({ token }: GetBuildingParams, { dispatch }) => {
        try {
            const res = await apiCall({
                path: 'get-all-buildings',
                method: 'GET',
                token: token,
            });
            console.log(res)
            if (res.success) {
                dispatch(getBuildingSuccess({ buildingData: res.buildings }));
                return res.buildings;
            } else {
                dispatch(getBuildingFailure(res.error));
                return res.error;
            }
        } catch (error) {
            dispatch(getBuildingFailure('An unexpected error occurred'));
            throw error;
        }
    }
);

interface GetBuildingByIdParams {
    token: string | null;
    id: number | null
}

export const getBuildingById = createAsyncThunk(
    'building/getById',
    async ({ id, token }: GetBuildingByIdParams, { dispatch }) => {
        console.log({ id: id })
        try {
            const res = await apiCall({
                path: `get-building?id=${id}`,
                method: 'GET',
                token: token,
            });
            console.log(res)
            if (res.success) {
                dispatch(getBuildingByIdSuccess(res.building));
                return res.building;
            } else {
                dispatch(getBuildingByIdFailure(res.error));
                return res.error;
            }
        } catch (error) {
            dispatch(getBuildingByIdFailure('An unexpected error occurred'));
            throw error;
        }
    }
);

interface DeleteBuildingByIdParams {
    token: string | null;
    id: number | null
}
export const deleteBuildingId = createAsyncThunk(
    'building/delete',
    async ({ id, token }: DeleteBuildingByIdParams, { dispatch }) => {
        try {
            const res = await apiCall({
                path: `delete-building?id=${id}`,
                method: 'POST',
                token: token,
            });
            if (res?.success) {
                dispatch(getBuilding({ token }));
                return res;
            } else {
                dispatch(deleteBuildingFailure(res.error));
                const data = {
                    message: res?.message,
                    type: "error",
                }
                dispatch(saveMessage(data));
                return res.error;
            }
        } catch (error) {
            dispatch(deleteBuildingFailure('An unexpected error occurred'));
            throw error;
        }
    }
);