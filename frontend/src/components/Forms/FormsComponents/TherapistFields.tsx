import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, Path, FieldValues } from "react-hook-form";

interface TherapistFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

export const TherapistFields = <T extends FieldValues>({
  form,
}: TherapistFieldsProps<T>) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <FormField
      control={form.control}
      name={"phoneNumber" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <Input
              placeholder="Digite aqui seu telefone com DDD (apenas números)"
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
      name={"speciality" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Especialidades</FormLabel>
          <FormControl>
            <Input
              placeholder="Especialidades separadas por vírgula"
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
      name={"mediumCost" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Custo médio</FormLabel>
          <FormControl>
            <Input
              placeholder="Custo médio de seu atendimento"
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
      name={"inscriptionNumber" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Número de inscrição</FormLabel>
          <FormControl>
            <Input
              placeholder="Registro de classe (CREFITO: XXXXXX-F)"
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
