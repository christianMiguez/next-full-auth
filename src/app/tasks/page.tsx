import { TaskForm } from "@/components/UI/Forms/TaskForm/TaskForm";
import TaskRow from "@/components/UI/Forms/TaskForm/TaskRow";
import { authOptions } from "@/lib/authOptions";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

async function loadTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`, {
    cache: "no-store",
    method: "GET",
    headers: headers(),
  });
  const data = await res.json();
  return data;
}

const TasksPage = async () => {
  const tasks = await loadTasks();
  return (
    <div className="max-w-[80%] mx-auto my-4">
      <TaskForm />
      <h1 className="text-center text-xl font-bold py-3 text-white">Tasks</h1>
      <table className="rounded-l-md rounded-r-md overflow-hidden w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {" "}
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
    </div>
  );
};

export default TasksPage;
