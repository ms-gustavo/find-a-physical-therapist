"use client";

import TherapistRegisterForm from "@/components/Forms/TherapistRegisterForm/TherapistRegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TherapistRegisterPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);
  return (
    <div
      id="therapist-register-page"
      className="mx-auto p-4 bg-background rounded-lg space-y-6"
    >
      <h1
        id="therapist-register-page-header"
        className="text-2xl text-center font-bold mb-4"
      >
        Registrar como Terapeuta
      </h1>
      <TherapistRegisterForm />
    </div>
  );
};

export default TherapistRegisterPage;
