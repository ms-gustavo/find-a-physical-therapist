"use client";

import UserLoginForm from "@/components/Forms/UserLoginForm/UserLoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TherapistLoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);
  return (
    <div className="mx-auto p-4 bg-background rounded-lg space-y-6">
      <h1 className="text-2xl text-center font-bold mb-4">
        Login como Terapueta
      </h1>
      <UserLoginForm userType="therapist" />
    </div>
  );
};

export default TherapistLoginPage;
