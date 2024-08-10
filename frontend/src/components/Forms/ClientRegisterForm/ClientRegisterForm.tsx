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
import axios from "axios";

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
        name: values.username,
        email: values.email,
        password: values.password,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      };

      try {
        const test = await axios.post(
          "http://localhost:5000/api/auth/client/register",
          formData
        );
        console.log("Form submitted successfully:", test.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Error submitting form:", error.response.data); //
        } else {
          console.error("Error submitting form:", error.message);
        }
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
