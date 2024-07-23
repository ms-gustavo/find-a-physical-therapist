import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "O nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email é obrigatório",
    "string.email": "O email deve ser um endereço de e-mail válido",
  }),
  password: Joi.string().required().messages({
    "any.required": "A senha é obrigatória",
  }),
  role: Joi.string().valid("CLIENT", "THERAPIST").required().messages({
    "any.required": "O tipo de usuário é obrigatório",
  }),
  speciality: Joi.string().when("role", {
    is: "THERAPIST",
    then: Joi.required().messages({
      "any.required": "A especialidade é obrigatória para terapeutas",
    }),
    otherwise: Joi.forbidden(),
  }),
  location: Joi.object({
    type: Joi.string().valid("Point"),
    coordinates: Joi.array().items(Joi.number()).length(2),
  })
    .required()
    .messages({
      "any.required": "A localização é obrigatória",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email é obrigatório",
    "string.email": "O email deve ser um endereço de e-mail válido",
  }),
  password: Joi.string().required().messages({
    "any.required": "A senha é obrigatória",
  }),
});
