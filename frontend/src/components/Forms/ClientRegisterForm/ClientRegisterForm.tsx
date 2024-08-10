"use client";

import {
  clientRegisterFormSchema,
  ClientRegisterFormValues,
} from "@/utils/formSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { fetchAddress } from "@/utils/fetchAddress";
import { transformAddressToLongLat } from "@/utils/transformAddressToLongLat";
import { mutualDefaultValues } from "@/utils/defaultValues";
import { FormLayout } from "../FormLayout/FormLayout";
import { UserFields } from "../FormsComponents/UserFields";
import { AddressFields } from "../FormsComponents/AddressFields";
import { clientRegister } from "@/utils/serverRequests";
import toast from "react-hot-toast";

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
        console.log("Form submitted successfully:", response.data);
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
    <FormLayout form={form} onSubmit={onSubmit} loading={loading}>
      <UserFields form={form} />
      <AddressFields form={form} handleCepChange={handleCepChange} />
    </FormLayout>
  );
};

export default ClientRegisterForm;
