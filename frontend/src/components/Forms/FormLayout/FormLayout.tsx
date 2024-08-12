import React from "react";
import { Form } from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormLayoutProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  loading: boolean;
  children: React.ReactNode;
  type: string;
}

export const FormLayout = <T extends FieldValues>({
  form,
  onSubmit,
  loading,
  children,
  type,
}: FormLayoutProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-4 bg-background rounded-lg shadow-md space-y-6"
      >
        {children}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark rounded-md py-2"
          disabled={loading}
        >
          {loading
            ? "Carregando..."
            : type === "login"
            ? "Entrar"
            : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};
