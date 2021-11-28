import { createSlice } from "@reduxjs/toolkit";
import cuid from "cuid";

export function getNickName({ lastName = "", firstName = "" }) {
  return `${lastName} ${firstName}`;
}
const getDefaultRow = () => {
  return {
    id: cuid(),
    nickname: getNickName({}),
    firstName: "",
    lastName: "",
    birthday: String(new Date()),
    printed: true,
    agePrinted: true,
  };
};
export const birthdaysSlice = createSlice({
  name: "birthdays",
  initialState: {
    values: [getDefaultRow()],
  },
  reducers: {
    setBirthdays: (state, action) => {
      state.values = action.payload;
    },
    upsertBirthday: (state, action) => {
      const index = state.values.findIndex(
        (x) => action?.payload?.id && x?.id === action?.payload?.id
      );

      if (action?.payload?.birthday) {
        action.payload.birthday = String(action.payload.birthday);
      }

      if (index === -1) {
        state.values.push({ ...getDefaultRow(), ...action.payload });
      } else {
        state.values[index] = {
          ...getDefaultRow(),
          ...state.values[index],
          ...action.payload,
        };
      }
    },
    removeBirthday: (state, action) => {
      const index = state.values.findIndex((x) => x.id === action.payload.id);
      if (index !== -1) {
        state.values = [
          ...state.values.slice(0, index),
          ...state.values.slice(index + 1),
        ];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { upsertBirthday, removeBirthday, setBirthdays } =
  birthdaysSlice.actions;

export default birthdaysSlice.reducer;
