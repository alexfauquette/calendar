import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";

export const getDayKey = (day) => {
  if (!day) {
    return null;
  }
  return format(day, "yyyy-MM-dd");
};

export const dayCelebrationSelector = (day) => {
  const key = getDayKey(day);
  if (key == null) {
    return () => null;
  }
  return (state) => state.dayEditing.celebrations[key];
};

export const dayEditingSlice = createSlice({
  name: "dayEditing",
  initialState: {
    currentEditor: null,
    celebrations: {},
    monthColor: [
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
      "#90caf9",
    ],
  },
  reducers: {
    setCurrentEditor: (state, action) => {
      state.currentEditor = action.payload;
    },
    setCelebration: (state, action) => {
      if (action.payload.day) {
        state.celebrations[action.payload.day] = action.payload.value;
      }
    },
    setDayOverride: (state, action) => {
      state.celebrations = { ...state.celebration, ...action.payload };
    },
    setMonthColor: (state, action) => {
      if (action.payload.monthIndex != null && action.payload.value != null) {
        state.monthColor[action.payload.monthIndex] = action.payload.value;
      }
    },
    setMonthsColors: (state, action) => {
      if (action.payload.length === 12) {
        state.monthColor = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentEditor,
  setCelebration,
  setDayOverride,
  setMonthColor,
  setMonthsColors,
} = dayEditingSlice.actions;
export default dayEditingSlice.reducer;
