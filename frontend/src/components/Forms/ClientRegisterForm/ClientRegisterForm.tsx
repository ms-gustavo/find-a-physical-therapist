"use client";

import {
  clientRegisterFormSchema,
  ClientRegisterFormValues,
} from "@/utils/formSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { geocodeAddress } from "@/utils/geocode";

const ClientRegisterForm = () => {
  const form = useForm<ClientRegisterFormValues>({
    resolver: zodResolver(clientRegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      address: {
        cep: "",
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        number: "",
        complement: "",
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const fetchAddress = async (cep: string) => {
    if (!cep) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      form.setValue("address.street", data.logradouro || "");
      form.setValue("address.neighborhood", data.bairro || "");
      form.setValue("address.city", data.localidade || "");
      form.setValue("address.state", data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: ClientRegisterFormValues) {
    setLoading(true);
    try {
      const address = `${values.address.street}, ${values.address.number}, ${values.address.neighborhood}, ${values.address.city}, ${values.address.state}, Brazil`;
      const { latitude, longitude } = await geocodeAddress(address);

      const formData = {
        username: values.username,
        email: values.email,
        password: values.password,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      };

      console.log("Transformed Data:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-4 bg-background rounded-lg shadow-md space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui seu nome completo"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui seu e-mail"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui sua senha"
                    type="password"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormDescription>
                  A senha deve ter no mínimo 6 caracteres
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu CEP"
                    {...field}
                    onBlur={(e) => fetchAddress(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rua, Avenida, etc."
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o bairro"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a cidade"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o estado"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="address.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número do endereço"
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apto, Bloco, etc."
                    {...field}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark rounded-md py-2"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Registrar"}
        </Button>
      </form>
    </Form>
  );
};

export default ClientRegisterForm;
