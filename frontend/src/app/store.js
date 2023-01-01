import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/task/taskSlice";
import modalReducer from "../features/modal/modalSlice";
import editModalReducer from "../features/modal/editModalSlice";
import { taskApiSlice } from "../features/api/taskApiSlice";

export default configureStore({
  reducer: {
    task: taskReducer,
    modal: modalReducer,
    editModal: editModalReducer,
    [taskApiSlice.reducerPath]: taskApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApiSlice.middleware),
});
