"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { UserIcon, HomeIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/",
    });
  };

  return (
    <nav
      id="navbar-component"
      className="bg-light-background dark:bg-dark-background p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-light-text dark:text-dark-text text-lg font-bold">
          <Link href="/">
            <HomeIcon id="home-icon" className="h-10 w-10" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex space-x-4">
          <ThemeToggle />
          {session ? (
            <>
              <Popover data-value="authenticated-popover">
                <PopoverTrigger>
                  <UserIcon
                    id="user-icon"
                    className="h-10 w-10"
                    aria-hidden="true"
                  />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col space-y-2 p-2">
                  <Link
                    id="my-data-link"
                    href="/meus-dados"
                    className="block mx-4"
                  >
                    Meus dados
                  </Link>
                  <button
                    id="logout-button"
                    onClick={handleLogout}
                    className="block mx-4"
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Popover>
                <PopoverTrigger data-value="login-popover">
                  Login
                </PopoverTrigger>
                <PopoverContent
                  data-value="login-popover-content"
                  className="flex flex-col space-y-2 p-2"
                >
                  <Link
                    id="pacient-login"
                    href="/login/client"
                    className="block mx-4"
                  >
                    Paciente
                  </Link>
                  <Link
                    id="therapist-login"
                    href="/login/therapist"
                    className="block mx-4"
                  >
                    Terapeuta
                  </Link>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger data-value="register-popover">
                  Registrar
                </PopoverTrigger>
                <PopoverContent
                  data-value="register-popover-content"
                  className="flex flex-col space-y-2 p-2"
                >
                  <Link
                    id="pacient-register"
                    href="/register/client"
                    className="block mx-4"
                  >
                    Paciente
                  </Link>
                  <Link
                    id="therapist-register"
                    href="/register/therapist"
                    className="block mx-4"
                  >
                    Terapeuta
                  </Link>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
