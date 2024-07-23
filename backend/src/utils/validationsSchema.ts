import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("CLIENT", "THERAPIST").required(),
  speciality: Joi.string().when("role", {
    is: "THERAPIST",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
