"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { NavbarLogo } from "./NavbarLogo";
import Spinner from "../UI/Spinner/Spinner";

export const Navbar = () => {
  const { data: session, status, update } = useSession();
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

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-black dark:border-gray-700">
            {session && (
              <li>
                <Link
                  href="/tasks"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Tasks
                </Link>
              </li>
            )}
            <li>Protected (Server)</li>
            <li>Protected (Client)</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
