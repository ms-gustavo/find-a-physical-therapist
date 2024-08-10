import axios from "axios";

export const addressRequest = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar o endereço:", error.message);
  }
};
