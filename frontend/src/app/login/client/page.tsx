"use client";

import UserLoginForm from "@/components/Forms/UserLoginForm/UserLoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ClientLoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);
  return (
    <div
      id="client-login-page"
      className="mx-auto p-4 bg-background rounded-lg space-y-6"
    >
      <h1
        id="client-login-page-header"
        className="text-2xl text-center font-bold mb-4"
      >
        Login como Paciente
      </h1>
      <UserLoginForm data-value="user-login-form" userType="client" />
    </div>
  );
};

export default ClientLoginPage;
