export const newClient = {
  name: "Test Client",
  email: "testclient@example.com",
  password: "password123",
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
};

export const mockClientLogin = {
  email: "testclient@example.com",
  password: "password123",
};

export const mockTherapistLogin = {
  email: "newtherapist@example.com",
  password: "password123",
};

export const mockLoginFindUser = {
  email: "testlogin@example.com",
  save: jest.fn(),
};

export const nonExistentUser = {
  email: "inexistentuser@example.com",
  password: "123456",
};

export const clientInvalidEmailAddress = {
  name: "Test Client",
  email: "test client@example.com",
  password: "password123",
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
};

export const newTherapist = {
  name: "New Therapist",
  email: "newtherapist@example.com",
  password: "password123",
  mediumCost: 130,
  speciality: ["Speciality 1", "Speciality 2"],
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  inscriptionNumber: "123456",
};

export const therapistInvalidEmailAddress = {
  name: "New Therapist",
  email: "new therapist@example.com",
  password: "password123",
  mediumCost: 130,
  speciality: ["Speciality 1", "Speciality 2"],
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  inscriptionNumber: "123456",
};

export const userMessages = {
  foundUser: "Usuário encontrado",
  userNotFound: "Usuário não encontrado",
  invalidCredentials: "E-mail ou senha inválidos",
};

export const clientApi = {
  register: "/api/auth/client/register",
  login: "/api/auth/client/login",
};

export const clientMessages = {
  userAlreadyExists: "Usuário já existente",
  nameIsRequired: "O nome é obrigatório",
  emailIsRequired: "Email é obrigatório",
  emailInvalid: "O email deve ser um endereço de e-mail válido",
  passwordIsRequired: "A senha é obrigatória",
  locationIsRequired: "A localização é obrigatória",
};

export const therapistApi = {
  register: "/api/auth/therapist/register",
  login: "/api/auth/therapist/login",
};

export const therapistMessages = {
  userAlreadyExists: "Usuário já existente",
  nameIsRequired: "O nome é obrigatório",
  emailIsRequired: "Email é obrigatório",
  emailInvalid: "O email deve ser um endereço de e-mail válido",
  passwordIsRequired: "A senha é obrigatória",
  mediumCostIsRequired: "O valor médio é obrigatório",
  specialityIsRequired: "A especialidade é obrigatória",
  locationIsRequired: "A localização é obrigatória",
  inscriptionNumberIsRequired: "O número de registro de classe é obrigatório",
};
