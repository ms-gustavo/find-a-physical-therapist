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

interface AddressFieldsProps {
  form: UseFormReturn<ClientRegisterFormValues>;
  handleCepChange: (cep: string) => void;
}

export const AddressFields: React.FC<AddressFieldsProps> = ({
  form,
  handleCepChange,
}) => (
  <>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    </div>
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
  </>
);
