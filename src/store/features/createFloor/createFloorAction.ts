import { createAsyncThunk } from '@reduxjs/toolkit';
import apiCall from '../../../services';
import { createFloorFailure, createFloorStart, createFloorSuccess, deleteFloorFailure } from './createFloorSlice';
import { saveMessage } from '../../common';
import { getBuildingById } from '../createBuilding/createBuildingAction';

interface CreateFloorParams {
    buildingId: number;
    floorName: string;
    orderNumber: number;
    image: File | null;
    token: string | null;
}

export const createFloor = createAsyncThunk(
    'floor/create',
    async ({ buildingId, floorName, orderNumber, image, token }: CreateFloorParams, { dispatch }) => {
        try {
            dispatch(createFloorStart());

            const formData = new FormData();
            formData.append('building_id', buildingId.toString());
            formData.append('floor_name', floorName);
            formData.append('order_number', orderNumber.toString());
            if (image) {
                formData.append('image', image);
            }

            const res = await apiCall({
                path: 'create-floor',
                method: 'post',
                body: formData,
                token: token,
                isForm: true
            });
            if (res.success) {
                dispatch(createFloorSuccess({ buildingName: res.building.name, buildingId: res.building.id }));
                const data = {
                    message: res?.message,
                    type: "success",
                }
                dispatch(saveMessage(data));
                return res;
            } else {
                dispatch(createFloorFailure({ error: res.error }));
                const data = {
                    message: res?.message,
                    type: "error",
                }
                dispatch(saveMessage(data));
                return res;
            }
        } catch (error) {
            dispatch(createFloorFailure({ error: 'An unexpected error occurred' }));
            throw error;
        }
    }
);
interface DeleteFloorByIdParams {
    token: string | null;
    deleteFloor: number | null;
    id: number | null
}

export const deleteFloorApi = createAsyncThunk(
    'floor/delete',
    async ({ deleteFloor, token, id }: DeleteFloorByIdParams, { dispatch }) => {
        try {
            const res = await apiCall({
                path: `delete-floor?id=${deleteFloor}`,
                method: 'POST',
                token: token,
            });
            console.log(res)
            if (res?.success) {
                dispatch(getBuildingById({ id, token }));
                const data = {
                    message: res?.message,
                    type: "success",
                };
                dispatch(saveMessage(data));
                return res;
            } else {
                dispatch(deleteFloorFailure(res.error));
                const errorData = {
                    message: res?.message,
                    type: "error",
                };
                dispatch(saveMessage(errorData));
                return res.error;
            }
        } catch (error) {
            dispatch(deleteFloorFailure("An unexpected error occurred"));
            throw error;
        }
    }
);
