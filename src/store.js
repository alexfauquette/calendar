import { configureStore } from "@reduxjs/toolkit";
import pictureSystemReducer from "./features/pictureSystem";
import draggingReducer from "./features/dragging";
import birthdaysReducer from "./features/birthdays";
import dayEditingReducer from "./features/dayEditing";

export default configureStore({
  reducer: {
    pictureSystem: pictureSystemReducer,
    dragging: draggingReducer,
    birthdays: birthdaysReducer,
    dayEditing: dayEditingReducer,
  },
});
