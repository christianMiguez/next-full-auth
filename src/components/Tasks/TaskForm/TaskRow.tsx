"use client";

import { getFormatedDate } from "@/utils";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import IconDelete from "@/components/UI/Icons/IconDelete";
import { useDeleteTaskMutation } from "@/redux/services/taskApi";

interface TaskRowProps {
  task: Task;
}

const TaskRow = ({ task }: TaskRowProps) => {
  const router = useRouter();
  const formatedDate = getFormatedDate(new Date(task.createdAt));

  const [deleteTask] = useDeleteTaskMutation();

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
          onClick={() => deleteTask({ id: task.id })}
          className="text-white py-2 px-4 bg-red-600 text-center rounded-md hover:scale-105"
        >
          <IconDelete />
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
