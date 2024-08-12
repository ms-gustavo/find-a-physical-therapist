"use client";

import { loginFormSchema, LoginFormValues } from "@/utils/formSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginDefaultValues } from "@/utils/defaultValues";
import { FormLayout } from "../FormLayout/FormLayout";
import { UserFields } from "../FormsComponents/UserFields";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const ClientLoginForm = () => {
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
      });
      console.log(response);
      toast.success("Cadastro realizado com sucesso!");
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

export default ClientLoginForm;
