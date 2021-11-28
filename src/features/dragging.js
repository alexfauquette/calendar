import { createSlice } from "@reduxjs/toolkit";

export const draggingSlice = createSlice({
  name: "dragging",
  initialState: {
    src: null,
  },
  reducers: {
    startDragging: (state, action) => {
      state.src = action.payload.src;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startDragging } = draggingSlice.actions;

export default draggingSlice.reducer;
