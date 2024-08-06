export const newClient = {
  name: "Test Client",
  email: "testclient@example.com",
  password: "password123",
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
};

export const clientServerErrorData = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword",
  location: { type: "Point", coordinates: [0, 0] },
};

export const deleteNewClient = {
  name: "Test Delete Client",
  email: "deleteclient@example.com",
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

export const deleteNewTherapist = {
  name: "New Therapist",
  email: "deletenewtherapist@example.com",
  password: "password123",
  phoneNumber: "71912341234",
  mediumCost: 130,
  speciality: ["Speciality 1", "Speciality 2"],
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  inscriptionNumber: "123456",
};

export const newTherapist = {
  name: "New Therapist",
  email: "newtherapist@example.com",
  password: "password123",
  phoneNumber: "71912341234",
  mediumCost: 130,
  speciality: ["Speciality 1", "Speciality 2"],
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  inscriptionNumber: "123456",
};

export const therapistServerErrorData = {
  name: "New Therapist",
  email: "therapistservererrordata@example.com",
  password: "password123",
  phoneNumber: "71912341234",
  mediumCost: 130,
  speciality: ["Speciality 1", "Speciality 2"],
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  inscriptionNumber: "123456",
};

export const newQueryTherapist = {
  name: "Therapist Search By Query Test",
  email: "newquerytherapist@example.com",
  password: "password123",
  phoneNumber: "71912341234",
  mediumCost: 300,
  speciality: ["Speciality 1", "Speciality 2", "Speciality Test"],
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
  phoneNumber: "71912341234",
  mediumCost: 130,
  speciality: ["Speciality 1", "Speciality 2"],
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  inscriptionNumber: "123456",
};

export const therapistInvalidPhoneNumber = {
  name: "New Therapist",
  email: "newtherapist@example.com",
  password: "password123",
  phoneNumber: "719123412345",
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
  userDeleted: "Usuário deletado",
  internalServerError: "Erro interno do servidor",
  noTokenProvided: "Nenhum token de autenticação fornecido",
};

export const usersApi = {
  profile: "/api/users/profile",
  deleteProfile: "/api/users/profile/delete",
};

export const clientApi = {
  register: "/api/auth/client/register",
  login: "/api/auth/client/login",
  profile: "/api/users/client/profile",
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
  profile: "/api/users/therapist/profile",
};

export const searchApi = {
  getAllTherapists: "/api/search/getalltherapists",
  searchByName: "/api/search/therapistbyname",
  searchByQuery: "/api/search/therapists",
  searchById: "/api/search/therapist/",
};

export const therapistMessages = {
  userAlreadyExists: "Usuário já existente",
  nameIsRequired: "O nome é obrigatório",
  emailIsRequired: "Email é obrigatório",
  emailInvalid: "O email deve ser um endereço de e-mail válido",
  phoneNumberIsRequired: "O número de telefone é obrigatório",
  phoneNumbeMustHave11Characteres: "O número de telefone deve ter 11 dígitos",
  passwordIsRequired: "A senha é obrigatória",
  mediumCostIsRequired: "O valor médio é obrigatório",
  specialityIsRequired: "A especialidade é obrigatória",
  locationIsRequired: "A localização é obrigatória",
  inscriptionNumberIsRequired: "O número de registro de classe é obrigatório",
  therapistsNotFound: "Nenhum fisioterapeuta encontrado",
  therapistNotFound: "Fisioterapeuta não encontrado",
};

export const createNewReview = {
  rating: 5,
  comment: "Create a review test",
};

export const reviewApi = {
  create: "/api/review/create",
  getReviews: "/api/review/",
};

export const reviewMessages = {
  ratingIsRequired: "A classificação é obrigatória",
  minRating: "A avaliação mínima é 1",
  maxRating: "A avaliação máxima é 5",
};

export const consultApi = {
  create: "/api/schedule/create",
  getByDate: "/api/schedule/consultations",
  getHistory: "/api/schedule/history",
};

export const consultMessages = {
  consultAlreadyExists: "Já existe consulta agendada para esse horário",
};
