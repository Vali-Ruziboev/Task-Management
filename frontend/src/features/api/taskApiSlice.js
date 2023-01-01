import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApiSlice = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api` }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["tasks"],
    }),

    reorder: builder.mutation({
      query: ({task, status, order}) => ({
        url: `tasks/${task}/${status}`,
        method: "PATCH",
        body: {
          order,
        },
      }),
    }),

    updateTask: builder.mutation({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PATCH",
        body: {
          title: task.title,
          description: task.description,
        },
      }),
      invalidatesTags: ["tasks"],
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: {
          title: task.title,
          description: task.description,
          priority: task.priority,
        },
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useReorderMutation,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
