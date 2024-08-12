"use client";

import { loginFormSchema, LoginFormValues } from "@/utils/formSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { loginDefaultValues } from "@/utils/defaultValues";
import { FormLayout } from "../FormLayout/FormLayout";
import { UserFields } from "../FormsComponents/UserFields";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserLoginForm = ({ userType }: { userType: string }) => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginDefaultValues,
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: LoginFormValues) {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        userType: userType,
      });
      if (response && response.status !== 200) {
        return toast.error("Erro ao realizar login!");
      }
      router.push("/");
      router.refresh();
      toast.success("Login realizado com sucesso! Redirecionando...");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLayout<LoginFormValues>
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      type="login"
    >
      <UserFields<LoginFormValues> form={form} type="login" />
    </FormLayout>
  );
};

export default UserLoginForm;
