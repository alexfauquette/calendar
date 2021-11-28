import { createSlice } from "@reduxjs/toolkit";

export const pictureSystemSlice = createSlice({
  name: "pictureSystem",
  initialState: {
    pictures: [],
    // dirHandle: null,
    months: [
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
    ],
    cropper: null,
  },
  reducers: {
    fetchPictures: (state, action) => {
      const urlMapping = {};
      state.pictures.forEach(({ url, name }) => {
        urlMapping[url] = name;
        URL.revokeObjectURL(url);
      });

      const nameMapping = {};
      action.payload.pictures.forEach(({ name, url }) => {
        nameMapping[name] = url;
      });
      state.pictures = action.payload.pictures;

      state.months.forEach((month, monthIndex) => {
        month.forEach((picture, pictureIndex) => {
          if (picture.src) {
            const name = urlMapping[picture.src];
            const newUrl = nameMapping[name];
            if (newUrl !== undefined) {
              state.months[monthIndex][pictureIndex] = {
                ...state.months[monthIndex][pictureIndex],
                src: newUrl,
              };
              return;
            }
          }
          state.months[monthIndex][pictureIndex] = {};
        });
      });
    },
    setMonths: (state, action) => {
      state.months = action.payload;

      state.months.forEach((month) => {
        month.forEach((picture) => {
          if (picture && picture.name) {
            picture.src = state.pictures.find(
              (p) => p.name === picture.name
            )?.url;
          }
        });
      });
    },
    updatePicture: (state, action) => {
      const { monthIndex, pictureIndex, ...override } = action.payload;

      if (override.src !== undefined) {
        state.months[monthIndex][pictureIndex] = {
          ...override,
        };
      } else {
        state.months[monthIndex][pictureIndex] = {
          ...state.months[monthIndex][pictureIndex],
          ...override,
        };
      }
    },
    setCropper: (state, action) => {
      if (!action.payload) {
        state.cropper = null;
      } else {
        state.cropper = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchPictures, updatePicture, setCropper, setMonths } =
  pictureSystemSlice.actions;

export default pictureSystemSlice.reducer;
