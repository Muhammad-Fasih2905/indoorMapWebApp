import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BuildingState {
    building: {
        name: string;
        id: number;
    };
    buildingName: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    buildingId: number | null;
    buildingData: Building[];
    buildingDataById: BuildingById | null;
    deleteMessage: string | null;
}
interface Floor {
    id: number;
    building_id: number;
    floor_name: string;
    order_number: number;
    pos_numbers: string[] | null;
    image: string;
}

const initialState: BuildingState = {
    buildingName: "",
    status: "idle",
    error: null,
    buildingId: null,
    buildingData: [],
    buildingDataById: null,
    building: { name: "", id: 0 },
    deleteMessage: null,
};

interface Building {
    id: number;
    name: string;
    floor_name: string | null;
    order_number: string | null;
    pos_numbers: string[] | null;
    image: string | null;
}
interface BuildingById {
    id: number;
    name: string;
    floor_name: string | null;
    order_number: string | null;
    pos_numbers: string[] | null;
    image: string | null;
    get_floors: Floor[];
}
const CreateBuildingSlice = createSlice({
    name: "building",
    initialState,
    reducers: {
        createBuildingStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        saveBuilding: (state, { payload }) => {
            state.building = payload;
            // state.buildingName = payload.buildingName;
            // state.buildingId = payload.buildingId;
        },
        createBuildingFailure: (state, { payload }: PayloadAction<{ error: string }>) => {
            state.status = "failed";
            state.error = payload.error;
        },
        getBuildingStart(state) {
            state.status = "loading";
            state.error = null;
        },
        getBuildingSuccess(state, action: PayloadAction<{ buildingData: Building[] }>) {
            console.log(action?.payload?.buildingData)
            state.status = "succeeded";
            state.buildingData = action.payload.buildingData;
        },
        getBuildingFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
        getBuildingByIdStart(state) {
            state.status = "loading";
            state.error = null;
        },
        getBuildingByIdSuccess: (state, { payload }: PayloadAction<BuildingById>) => {
            state.status = "succeeded";
            state.buildingDataById = payload;
        },
        getBuildingByIdFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
        deleteBuildingStart(state) {
            state.status = "loading";
            state.error = null;
            state.deleteMessage = null;
        },
        deleteBuildingSuccess(state,) {
            state.status = "succeeded";
        },
        deleteBuildingFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
        resetBuilding: (state) => {
            state.buildingName = '';
            state.status = 'idle';
            state.error = null;
            state.buildingId = null;
            // state.buildingData = [];
            state.buildingDataById = null;
            state.building = { id: 0, name: '' };
            state.deleteMessage = null;
        },
    },

});

export const {
    createBuildingStart,
    saveBuilding,
    createBuildingFailure,
    getBuildingStart,
    getBuildingSuccess,
    getBuildingFailure,
    getBuildingByIdStart,
    getBuildingByIdSuccess,
    getBuildingByIdFailure,
    deleteBuildingStart,
    deleteBuildingSuccess,
    deleteBuildingFailure,
    resetBuilding
} = CreateBuildingSlice.actions;

export default CreateBuildingSlice.reducer;
