"use client";

import { getFormatedDate } from "@/utils";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IconDelete from "../../UI/Icons/IconDelete";

interface TaskRowProps {
  task: Task;
}

const TaskRow = ({ task }: TaskRowProps) => {
  const router = useRouter();
  const formatedDate = getFormatedDate(new Date(task.createdAt));

  const handleDelete = async () => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          router.refresh();
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <tr key={task.id} className="bg-slate-800 p-3">
      <td className="p-3">{formatedDate}</td>
      <td className="p-3 text-white">{task.title}</td>
      <td className="p-3">{task.content}</td>
      <td className="p-3 text-right flex justify-end">
        <button
          type="button"
          onClick={() => router.push(`/tasks/${task.id}/edit`)}
          className="text-white py-2 px-4 bg-slate-600 text-center rounded-md hover:scale-105 mr-2"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="text-white py-2 px-4 bg-red-600 text-center rounded-md hover:scale-105"
        >
          <IconDelete />
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
