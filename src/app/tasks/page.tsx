import { TaskForm } from "@/components/TaskForm/TaskForm";
import TaskTable from "@/components/TaskTable/TaskTable";

export default async function TasksPage() {
  return (
    <div className="w-[95%] max-w-[800px] mx-auto my-4">
      <TaskForm />
      <TaskTable />
    </div>
  );
}
