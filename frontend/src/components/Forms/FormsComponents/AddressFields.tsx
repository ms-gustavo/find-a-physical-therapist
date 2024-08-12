import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface AddressFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  handleCepChange: (cep: string) => void;
}

export const AddressFields = <T extends FieldValues>({
  form,
  handleCepChange,
}: AddressFieldsProps<T>) => (
  <>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name={"address.cep" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite seu CEP (XXXXX-XXX)"
                {...field}
                onBlur={(e) => handleCepChange(e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"address.street" as Path<T>}
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
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name={"address.neighborhood" as Path<T>}
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
      <FormField
        control={form.control}
        name={"address.city" as Path<T>}
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
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name={"address.state" as Path<T>}
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
      <FormField
        control={form.control}
        name={"address.number" as Path<T>}
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
    </div>
    <FormField
      control={form.control}
      name={"address.complement" as Path<T>}
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
  </>
);
