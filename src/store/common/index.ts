import { createSlice } from "@reduxjs/toolkit";
import { commonState } from "../../types/store";
import { toast } from "react-toastify";
const initialState: commonState = {
  loading: false,
  message: "",
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    saveMessage: (state, { payload }) => {
      if (payload.type === "error") {
        toast.error(`${payload?.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`${payload?.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      state.message = payload;
    },
    saveLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { saveMessage, saveLoading } = commonSlice.actions;

export default commonSlice.reducer;
