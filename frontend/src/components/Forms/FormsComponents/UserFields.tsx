import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientRegisterFormValues } from "@/utils/formSchemas";

interface UserFieldsProps {
  form: UseFormReturn<ClientRegisterFormValues>;
}

export const UserFields: React.FC<UserFieldsProps> = ({ form }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <FormField
      control={form.control}
      name="name"
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
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
