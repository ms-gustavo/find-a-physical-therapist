import { UseFormReturn } from "react-hook-form";
import { addressRequest } from "./axiosRequests";
import { ClientRegisterFormValues } from "./formSchemas";

export const fetchAddress = async (
  cep: string,
  setLoading: (loading: boolean) => void,
  form: UseFormReturn<ClientRegisterFormValues>
) => {
  if (!cep) return;
  setLoading(true);

  try {
    console.log(cep);
    const response = await addressRequest(cep);

    form.setValue("address.street", response.logradouro || "");
    form.setValue("address.neighborhood", response.bairro || "");
    form.setValue("address.city", response.localidade || "");
    form.setValue("address.state", response.uf || "");
  } catch (error: any) {
    console.error("Erro ao buscar o endereço:", error.message);
  } finally {
    setLoading(false);
  }
};
