"use client";

import { getFormatedDate } from "@/utils";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TaskRowProps {
  task: Task;
}

const TaskRow = ({ task }: TaskRowProps) => {
  const router = useRouter();
  const formatedDate = getFormatedDate(new Date(task.createdAt));

  const handleEdit = (task: Task) => {
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          router.push("/tasks");
          router.refresh();
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <tr
      key={task.id}
      className="bg-white p-3 border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td className="p-3">{formatedDate}</td>
      <td className="p-3">{task.title}</td>
      <td className="p-3">{task.content}</td>
      <td className="p-3 text-right">
        <button
          type="button"
          onClick={() => handleEdit(task)}
          className="text-white py-2 px-4 bg-slate-600 text-center rounded-md mr-2"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="text-white py-2 px-4 bg-red-600 text-center rounded-md"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
