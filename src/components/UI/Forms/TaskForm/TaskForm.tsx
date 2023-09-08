"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export const TaskForm = () => {
  const router = useRouter();
  const { taskId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle("");
        setContent("");
        router.refresh();
      });
    //   .catch((err) => console.log(err));
  };

  const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTitle("");
          setContent("");
          router.push("/tasks");
          router.refresh();
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    if (taskId) {
      updateTask(e);
    } else {
      createTask(e);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetch(`/api/tasks/${taskId}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        });
    }
  }, [taskId]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-3"
          placeholder="Title..."
          autoFocus
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-white"
      >
        Content
      </label>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-4 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {taskId ? "Update" : "Create"}
      </button>
    </form>
  );
};
