"use client";
import { RegisterForm } from "@/components/UI/Forms/RegisterForm";
import { sign } from "crypto";
import { signIn, useSession } from "next-auth/react";

const Register = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
