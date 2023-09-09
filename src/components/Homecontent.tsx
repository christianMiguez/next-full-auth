"use client";

import { signIn } from "next-auth/react";

const Homecontent = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Home</h1>
      <p className="text-center text-gray-500">
        This is a Next.js template with Tailwind CSS, Redux Toolkit, Prisma,
        NextAuth.js, and more.
      </p>

      <div className="flex flex-col items-center justify-center space-y-4">
        please, Login to see the tasks page
        <button
          onClick={() => signIn("google", { callbackUrl: "/tasks" })}
          className="text-red-600 mr-3"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Homecontent;
