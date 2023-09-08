import { TaskForm } from "@/components/TaskForm/TaskForm";
import TaskRow from "@/components/TaskForm/TaskRow";
import { Task } from "@prisma/client";
import { headers } from "next/headers";

async function loadTasks() {
  let fetchConfig: any = {
    cache: "no-store",
    method: "GET",
  };
  if (process.env.NODE_ENV === "development") {
    fetchConfig = {
      ...fetchConfig,
      headers: headers(),
    };
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`);
  const data = await res.json();
  return data;
}

const TasksPage = async () => {
  const tasks = await loadTasks();
  return (
    <div className="w-[95%] max-w-[800px] mx-auto my-4">
      <TaskForm />
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
    </div>
  );
};

export default TasksPage;
