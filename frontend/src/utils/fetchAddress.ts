import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { addressRequest } from "./axiosRequests";
import { reverseGeocodeCoordinates } from "./geocode";
import { Therapist } from "@/app/therapists/all/page";

export const fetchAddress = async <T extends FieldValues>(
  cep: string,
  setLoading: (loading: boolean) => void,
  form: UseFormReturn<T>
) => {
  if (!cep) return;
  setLoading(true);

  try {
    const response = await addressRequest(cep);

    form.setValue("address.street" as Path<T>, response.logradouro || "");
    form.setValue("address.neighborhood" as Path<T>, response.bairro || "");
    form.setValue("address.city" as Path<T>, response.localidade || "");
    form.setValue("address.state" as Path<T>, response.uf || "");
  } catch (error: any) {
    console.error("Erro ao buscar o endereço:", error.message);
  } finally {
    setLoading(false);
  }
};

export async function fetchTherapistsWithAddresses(
  therapists: Therapist[]
): Promise<Therapist[]> {
  return Promise.all(
    therapists.map(async (therapist) => {
      try {
        const address = await reverseGeocodeCoordinates(
          therapist.location.coordinates[1],
          therapist.location.coordinates[0]
        );
        return { ...therapist, address };
      } catch (error) {
        console.error("Erro ao converter coordenadas para endereço:", error);
        return { ...therapist, address: {} };
      }
    })
  );
}
