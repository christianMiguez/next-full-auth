import { Task } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_URL + "/api/" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], null>({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),
    getTaskById: builder.query<Task, { id: string }>({
      query: ({ id }) => `tasks/${id}`,
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...body }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation<Task, { id: string }>({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
