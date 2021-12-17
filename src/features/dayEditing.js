import { createSlice } from "@reduxjs/toolkit";

export const dayEditingSlice = createSlice({
  name: "dayEditing",
  initialState: {
    currentEditor: null,
  },
  reducers: {
    setCurrentEditor: (state, action) => {
      state.currentEditor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentEditor } = dayEditingSlice.actions;

export default dayEditingSlice.reducer;
