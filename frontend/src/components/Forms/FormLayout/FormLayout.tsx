import React from "react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ClientRegisterFormValues } from "@/utils/formSchemas";
import { Button } from "@/components/ui/button";

interface FormLayoutProps {
  form: UseFormReturn<ClientRegisterFormValues>;
  onSubmit: (data: ClientRegisterFormValues) => void;
  loading: boolean;
  children: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  form,
  onSubmit,
  loading,
  children,
}) => {
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
          {loading ? "Carregando..." : "Registrar"}
        </Button>
      </form>
    </Form>
  );
};
