"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  clientRegisterFormSchema,
  ClientRegisterFormValues,
} from "@/utils/formSchemas";
import { useState } from "react";
import { fetchAddress } from "@/utils/fetchAddress";
import { transformAddressToLongLat } from "@/utils/transformAddressToLongLat";
import { mutualDefaultValues } from "@/utils/defaultValues";
import { FormLayout } from "../FormLayout/FormLayout";
import { UserFields } from "../FormsComponents/UserFields";
import { AddressFields } from "../FormsComponents/AddressFields";
import { clientRegister } from "@/utils/serverRequests";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const ClientRegisterForm = () => {
  const form = useForm<ClientRegisterFormValues>({
    resolver: zodResolver(clientRegisterFormSchema),
    defaultValues: mutualDefaultValues,
  });

  const [loading, setLoading] = useState(false);

  const handleCepChange = async (cep: string) => {
    await fetchAddress(cep, setLoading, form);
  };

  async function onSubmit(values: ClientRegisterFormValues) {
    setLoading(true);
    try {
      const { longitude, latitude } = await transformAddressToLongLat(values);

      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      };

      try {
        const response = await clientRegister(formData);
        console.log(response);
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        toast.success("Cadastro realizado com sucesso!");
      } catch (error: any) {
        toast.error(
          `Erro ao realizar cadastro! ${error.response.data.message}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLayout<ClientRegisterFormValues>
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      type="register"
    >
      <UserFields<ClientRegisterFormValues> form={form} type="register" />
      <AddressFields form={form} handleCepChange={handleCepChange} />
    </FormLayout>
  );
};

export default ClientRegisterForm;
