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

  function onSubmit(values: ClientRegisterFormValues) {
    console.log(values);
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
        >
          Registrar
        </Button>
      </form>
    </Form>
  );
};

export default ClientRegisterForm;
