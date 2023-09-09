"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { NavbarLogo } from "./NavbarLogo";
import Spinner from "../UI/Spinner/Spinner";

export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="bg-black border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavbarLogo />
        <div className="flex items-center md:order-2">
          {status === "loading" ? (
            <Spinner width={24} height={24} fill={"#fff"} />
          ) : (
            <>
              {session ? (
                <button
                  onClick={async () => {
                    await signOut({
                      callbackUrl: "/",
                    });
                  }}
                  className="text-red-600 mr-3"
                >
                  Salir
                </button>
              ) : (
                <button
                  onClick={() => signIn("google", { callbackUrl: "/tasks" })}
                  className="text-red-600 mr-3"
                >
                  Ingresar
                </button>
              )}
              <button
                type="button"
                className="flex mr-3 text-sm bg-black rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  className="w-8 h-8 rounded-full"
                  src={session?.user?.image || "/avatar.png"}
                  alt="48 photo"
                  width={100}
                  height={48}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
