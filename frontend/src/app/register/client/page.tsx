"use client";

import ClientRegisterForm from "@/components/Forms/ClientRegisterForm/ClientRegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ClientRegisterPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);
  return (
    <div
      id="client-register-page"
      className="mx-auto p-4 bg-background rounded-lg space-y-6"
    >
      <h1
        id="client-register-page-header"
        className="text-2xl text-center font-bold mb-4"
      >
        Registrar como Paciente
      </h1>
      <ClientRegisterForm data-value="client-register-form" />
    </div>
  );
};

export default ClientRegisterPage;
