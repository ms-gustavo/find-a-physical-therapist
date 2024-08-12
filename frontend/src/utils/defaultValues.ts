export const mutualDefaultValues = {
  username: "",
  email: "",
  password: "",
  address: {
    cep: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    number: "",
    complement: "",
  },
};

export const therapistRegisterValues = {
  ...mutualDefaultValues,
  phoneNumber: "",
  speciality: "",
  mediumCost: "",
  inscriptionNumber: "",
};

export const loginDefaultValues = {
  email: "",
  password: "",
};
