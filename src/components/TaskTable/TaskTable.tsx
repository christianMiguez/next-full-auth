import { Task } from "@prisma/client";
import React from "react";
import TaskRow from "../TaskForm/TaskRow";

async function getTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`);

  return res.json();
}

async function TaskTable() {
  const tasks = await getTasks();
  return (
    <>
      <h1 className="text-center text-xl font-bold py-3 text-white">Tasks</h1>
      <table className="rounded-l-md rounded-r-md overflow-hidden w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs  text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length ? (
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
    </>
  );
}

export default TaskTable;
