"use client";
import { Task } from "@prisma/client";
import { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm/TaskForm";
import TaskTable from "./TaskTable/TaskTable";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((json) => {
        setTasks(json);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <TaskForm />
      <TaskTable tasks={tasks} loading={loading} />
    </>
  );
};

export default Tasks;
