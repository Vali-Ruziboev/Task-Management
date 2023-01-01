import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    value: [],
  },
  reducers: {
    reorderWithinContainer: (state, action) => {
      const statusColumn = state.value.at(action.payload.source.droppableId);
      const sourceTasks = [...statusColumn.tasks];

      const [draggedTask] = sourceTasks.splice(action.payload.source.index, 1);
      sourceTasks.splice(action.payload.destination.index, 0, draggedTask);

      state.value.splice(action.payload.source.droppableId, 1, {
        ...statusColumn,
        tasks: [...sourceTasks],
      });

      state.value = [...state.value];
    },

    reorderBetweenContainer: (state, action) => {
      const sourceStatusCol = state.value.at(action.payload.source.droppableId);
      const destStatusCol = state.value.at(
        action.payload.destination.droppableId
      );

      const sourceTasks = [...sourceStatusCol.tasks];
      const destTasks = [...destStatusCol.tasks];
      const [draggedTask] = sourceTasks.splice(action.payload.source.index, 1);
      destTasks.splice(action.payload.destination.index, 0, draggedTask);

      state.value.splice(action.payload.source.droppableId, 1, {
        ...sourceStatusCol,
        tasks: [...sourceTasks],
      });
      state.value.splice(action.payload.destination.droppableId, 1, {
        ...destStatusCol,
        tasks: [...destTasks],
      });

      state.value = [...state.value];
    },

    addNewTask: (state, action) => {
      const { title, description } = action.payload;
      state.value.at(0).tasks.splice(state.value.at(0).tasks.length, 0, {
        id: state.value.at(0).tasks.length * 5,
        title,
        description,
      });
      state.value = [...state.value];
    },

    deleteTask: (state, action) => {
      const { droppableId, draggableId } = action.payload;

      const statusColumn = state.value.at(droppableId);
      const sourceTasks = [...statusColumn.tasks];

      const newTasksList = sourceTasks.filter(
        (task) => task.id !== +draggableId
      );

      state.value.splice(droppableId, 1, {
        ...statusColumn,
        tasks: [...newTasksList],
      });

      state.value = [...state.value];
    },

    updateTask: (state, action) => {
      const { droppableId, draggableId, priority, title, description } =
        action.payload;
      const statusColumn = state.value.at(droppableId);
      const sourceTasks = [...statusColumn.tasks];
      const editTask = sourceTasks.filter((task) => +task.id === +draggableId);
      const editTaskIndex = sourceTasks.findIndex(
        (task) => +task.id === +draggableId
      );

      sourceTasks.splice(editTaskIndex, 1, {
        ...editTask[0],
        title,
        description,
      });
      state.value.splice(droppableId, 1, {
        ...statusColumn,
        tasks: [...sourceTasks],
      });
      state.value = [...state.value];
    },

    fetchData: (state, action) => {
      const { data } = action.payload;

      state.value = [...data];
    },
  },
});

export const {
  reorderWithinContainer,
  reorderBetweenContainer,
  addNewTask,
  deleteTask,
  fetchData,
  updateTask,
} = taskSlice.actions;

export default taskSlice.reducer;
