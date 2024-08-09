"use client";

import { useSession, signOut } from "next-auth/react";
import Dropdown from "../Dropdown/Dropdown";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">find-a-physical-therapist</Link>
        </div>
        <div className="flex space-x-4">
          {session ? (
            <>
              <Link href="/meus-dados" className="text-white mx-4">
                Meus dados
              </Link>
              <button onClick={() => signOut()} className="text-white mx-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Dropdown
                label="Login"
                options={[
                  { label: "Paciente", href: "/login/paciente" },
                  { label: "Terapeuta", href: "/login/terapeuta" },
                ]}
              />
              <Dropdown
                label="Registrar"
                options={[
                  { label: "Paciente", href: "/register/paciente" },
                  { label: "Terapeuta", href: "/register/terapeuta" },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
