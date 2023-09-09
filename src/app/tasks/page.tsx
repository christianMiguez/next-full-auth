import { Counter } from "@/components/Counter/Counter";
import TaskTable from "@/components/TaskTable/TaskTable";
import { TaskForm } from "@/components/Tasks/TaskForm/TaskForm";

export default async function TasksPage() {
  return (
    <div className="w-[95%] max-w-[800px] mx-auto my-4">
      <TaskForm />
      <TaskTable />
      <Counter />
    </div>
  );
}
