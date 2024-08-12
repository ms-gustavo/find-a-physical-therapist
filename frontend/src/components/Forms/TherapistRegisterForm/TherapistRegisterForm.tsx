"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  therapistRegisterFormSchema,
  TherapistRegisterFormValues,
} from "@/utils/formSchemas";
import { useState } from "react";
import { fetchAddress } from "@/utils/fetchAddress";
import { transformAddressToLongLat } from "@/utils/transformAddressToLongLat";
import { therapistRegisterValues } from "@/utils/defaultValues";
import { FormLayout } from "../FormLayout/FormLayout";
import { UserFields } from "../FormsComponents/UserFields";
import { AddressFields } from "../FormsComponents/AddressFields";
import { therapistRegister } from "@/utils/serverRequests";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { TherapistFields } from "../FormsComponents/TherapistFields";
import { useRouter } from "next/navigation";

const TherapistRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TherapistRegisterFormValues>({
    resolver: zodResolver(therapistRegisterFormSchema),
    defaultValues: therapistRegisterValues,
  });

  const handleCepChange = async (cep: string) => {
    await fetchAddress(cep, setLoading, form);
  };

  async function onSubmit(values: TherapistRegisterFormValues) {
    setLoading(true);
    try {
      const { longitude, latitude } = await transformAddressToLongLat(values);
      const specialityArray = values.speciality
        .split(",")
        .map((item) => item.trim());

      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        speciality: specialityArray,
        mediumCost: values.mediumCost,
        inscriptionNumber: values.inscriptionNumber,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      };

      try {
        const response = await therapistRegister(formData);
        if (response.status !== 201) {
          return toast.error("Erro ao realizar cadastro!");
        }
        const login = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          userType: "therapist",
        });
        if (login && login.status !== 200) {
          return toast.error("Erro ao realizar login!");
        }
        router.push("/");
        router.refresh();
        toast.success("Cadastro realizado com sucesso! Redirecionando...");
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
    <FormLayout<TherapistRegisterFormValues>
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      type="register"
    >
      <UserFields<TherapistRegisterFormValues> form={form} type="register" />
      <TherapistFields form={form} />
      <AddressFields form={form} handleCepChange={handleCepChange} />
    </FormLayout>
  );
};

export default TherapistRegisterForm;
