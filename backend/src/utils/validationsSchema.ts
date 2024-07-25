import Joi from "joi";

export const registerClientSchema = Joi.object({
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
  location: Joi.object({
    type: Joi.string().valid("Point"),
    coordinates: Joi.array().items(Joi.number()).length(2),
  })
    .required()
    .messages({
      "any.required": "A localização é obrigatória",
    }),
});

export const registerTherapistSchema = Joi.object({
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
  mediumCost: Joi.number().required().messages({
    "any.required": "O valor médio é obrigatório",
  }),
  speciality: Joi.array().items(Joi.string()).required().messages({
    "any.required": "A especialidade é obrigatória",
  }),
  location: Joi.object({
    type: Joi.string().valid("Point"),
    coordinates: Joi.array().items(Joi.number()).length(2),
  })
    .required()
    .messages({
      "any.required": "A localização é obrigatória",
    }),
  inscriptionNumber: Joi.string().required().messages({
    "any.required": "O número de registro de classe é obrigatório.",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email é obrigatório",
    "string.email": "O email deve ser um endereço de e-mail válido",
  }),
  password: Joi.string().required().messages({
    "any.required": "A senha é obrigatória",
  }),
});

export const consultSchema = Joi.object({
  therapistId: Joi.string().required().messages({
    "any.required": "É necessário selecionar um terapeuta",
  }),
  datetime: Joi.date().iso().required().messages({
    "any.required": "A data e hora da consulta são obrigatórias",
  }),
});
