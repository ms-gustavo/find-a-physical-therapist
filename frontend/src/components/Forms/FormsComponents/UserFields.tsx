import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, Path, FieldValues } from "react-hook-form";

interface UserFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  type: string;
}

export const UserFields = <
  T extends { name?: string; email: string; password: string }
>({
  form,
  type,
}: UserFieldsProps<T>) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    {type === "register" && (
      <FormField
        data-value="test"
        control={form.control}
        name={"name" as Path<T>}
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
    )}
    <FormField
      control={form.control}
      name={"email" as Path<T>}
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
    <FormField
      control={form.control}
      name={"password" as Path<T>}
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
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
