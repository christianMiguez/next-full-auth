"use client";

import { Task } from "@prisma/client";

interface TaskRowProps {
  task: Task;
}

const handleEdit = (task: Task) => {
  console.log(task);
};

const TaskRow = ({ task }: TaskRowProps) => {
  return (
    <tr
      key={task.id}
      className="bg-white p-3 border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td className="p-3">{task.id}</td>
      <td className="p-3">{task.title}</td>
      <td className="p-3">{task.content}</td>
      <td className="p-3 text-right">
        <button
          onClick={() => handleEdit(task)}
          className="text-white py-2 px-4 bg-slate-600 text-center rounded-md mr-2"
        >
          Editar
        </button>
        <button className="text-white py-2 px-4 bg-red-600 text-center rounded-md">
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
