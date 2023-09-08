import { TaskForm } from "@/components/TaskForm/TaskForm";
import TaskRow from "@/components/TaskForm/TaskRow";
import TaskTable from "@/components/TaskTable/TaskTable";
import { Task } from "@prisma/client";
import { headers } from "next/headers";

export default async function TasksPage() {
  return (
    <div className="w-[95%] max-w-[800px] mx-auto my-4">
      <TaskForm />
      <TaskTable />
    </div>
  );
}
