import { z } from "zod";

export const clientRegisterFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  address: z.object({
    cep: z.string().min(1, "O CEP é obrigatório"),
    street: z.string().min(1, "O endereço é obrigatório"),
    neighborhood: z.string().min(1, "O bairro é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z.string().min(1, "O estado é obrigatório"),
    number: z.string().min(1, "O número é obrigatório"),
    complement: z.string().optional(),
  }),
});

export type ClientRegisterFormValues = z.infer<typeof clientRegisterFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const therapistRegisterFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  phoneNumber: z
    .string()
    .min(1, "O telefone é obrigatório")
    .max(11, "Telefone inválido"),
  speciality: z.string().min(1, "A especialidade é obrigatória"),
  mediumCost: z.string().min(1, "O custo médio é obrigatório"),
  inscriptionNumber: z.string().min(1, "O número de inscrição é obrigatório"),
  address: z.object({
    cep: z.string().min(1, "O CEP é obrigatório"),
    street: z.string().min(1, "O endereço é obrigatório"),
    neighborhood: z.string().min(1, "O bairro é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z.string().min(1, "O estado é obrigatório"),
    number: z.string().min(1, "O número é obrigatório"),
    complement: z.string().optional(),
  }),
});

export type TherapistRegisterFormValues = z.infer<
  typeof therapistRegisterFormSchema
>;
