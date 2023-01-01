import { createSlice } from "@reduxjs/toolkit";

export const editModalSlice = createSlice({
  name: "editModal",
  initialState: {
    value: null,
  },
  reducers: {
    startEditing: (state, action) => {
      const { droppableId, draggableId, priority, title, description } =
        action.payload;
      state.value = { droppableId, draggableId, priority, title, description };
    },
    stopEditing: (state) => {
      state.value = null;
    },
  },
});

export const { startEditing, stopEditing } = editModalSlice.actions;

export default editModalSlice.reducer;
