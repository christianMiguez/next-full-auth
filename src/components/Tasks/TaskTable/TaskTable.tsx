"use client";
import { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import TaskRow from "../TaskForm/TaskRow";
import Spinner from "../../UI/Spinner/Spinner";

interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
}

function TaskTable({ tasks, loading }: TaskTableProps) {
  return (
    <table className="rounded-l-md rounded-r-md overflow-hidden w-full text-sm text-left text-gray-500 ">
      <thead className="text-xs  text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 ">
        <tr>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Task
          </th>
          <th scope="col" className="px-6 py-3">
            I need to...
          </th>
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={4} className="text-center text-white py-4 ">
              <Spinner
                fill="#FFF"
                width={24}
                height={24}
                className="mx-auto w-[24px] h-[24px] "
              />
            </td>
          </tr>
        ) : tasks.length ? (
          tasks.map((task: Task) => <TaskRow task={task} key={task.id} />)
        ) : (
          <tr>
            <td colSpan={4} className="text-center text-white py-4">
              No tasks yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TaskTable;
