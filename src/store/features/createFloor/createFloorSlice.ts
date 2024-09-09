import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FloorState {
    buildingName: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    buildingId: number | null;
}

const initialState: FloorState = {
    buildingName: '',
    status: 'idle',
    error: null,
    buildingId: null,
};

const createFloorSlice = createSlice({
    name: 'building',
    initialState,
    reducers: {
        createFloorStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        createFloorSuccess: (state, { payload }: PayloadAction<{ buildingName: string; buildingId: number }>) => {
            state.status = 'succeeded';
            state.buildingName = payload.buildingName;
            state.buildingId = payload.buildingId;
        },
        createFloorFailure: (state, { payload }: PayloadAction<{ error: string }>) => {
            state.status = 'failed';
            state.error = payload.error;
        },
        deleteFloorStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        deleteFloorSuccess: (state) => {
            state.status = 'succeeded';
        },
        deleteFloorFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { createFloorStart, createFloorSuccess, createFloorFailure, deleteFloorStart, deleteFloorSuccess, deleteFloorFailure } = createFloorSlice.actions;

export default createFloorSlice.reducer;
