"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/services/taskApi";

export const TaskForm = () => {
  const router = useRouter();
  const { taskId } = useParams();
  const [currentTask, setCurrentTask] = useState({
    title: "",
    content: "",
  });

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: currentTask.title,
      content: currentTask.content,
    },
  });

  useEffect(() => {
    if (taskId) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks/${taskId}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentTask(data);
          reset(data);
        });
    }
  }, [reset, taskId]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        taskId ? updateTask(data) : createTask(data);
        taskId ? router.push("/tasks") : reset();
      })}
      className="mb-6"
    >
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-slate-800 border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-gray-400 text-white mb-3"
          placeholder="Title..."
          autoFocus
          required
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          {...register("title", {
            required: true,
            minLength: 3,
          })}
        />
        {errors.title && (
          <span className="text-red-500 text-xs block -mt-2 mb-3">
            {errors.title.type === "required"
              ? "This field is required"
              : "Min length 3 characters"}
          </span>
        )}
      </div>

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-white"
      >
        Content
      </label>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm bg-slate-800 rounded-lg border border-gray-800 focus:ring-blue-500 focus:border-blue-500  placeholder-gray-400 text-white mb-4"
        placeholder="Task description..."
        // value={content}
        // onChange={(e) => setContent(e.target.value)}
        {...register("content", {
          required: true,
          minLength: 5,
        })}
      ></textarea>
      {errors.content && (
        <span className="text-red-500 text-xs block -mt-2 mb-3">
          {errors.content.type === "required"
            ? "This field is required"
            : "Min length 5 characters"}
        </span>
      )}

      <button
        type="submit"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:scale-105"
      >
        {taskId ? "Update" : "Create"}
      </button>
    </form>
  );
};
