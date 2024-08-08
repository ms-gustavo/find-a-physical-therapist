/**
 * @swagger
 * /api/users/profile:
 *    get:
 *       summary: Retorna os dados do usuário autenticado
 *       tags: [Users]
 *       responses:
 *          200:
 *             description: Usuário encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         type:
 *                            type: string
 *                            example: Client
 *                         user:
 *                            type: object
 *                            properties:
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [0, 0]
 *                               _id:
 *                                  type: string
 *                               name:
 *                                  type: string
 *                               email:
 *                                  type: string
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          404:
 *             description: Usuário não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário não encontrado
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/users/client/profile:
 *    put:
 *       summary: Atualiza as informações do Cliente autenticado
 *       tags: [Client]
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                         type: string
 *                      location:
 *                         type: object
 *                         properties:
 *                            type:
 *                               type: string
 *                               example: Point
 *                            coordinates:
 *                               type: array
 *                               items:
 *                                  type: number
 *                               minItems: 2
 *                               maxItems: 2
 *                               example: [1, 1]
 *       responses:
 *          200:
 *             description: Cliente atualizado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         updatedUser:
 *                            type: object
 *                            properties:
 *                               _id:
 *                                  type: string
 *                               email:
 *                                  type: string
 *                               name:
 *                                  type: string
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [1, 1]
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          404:
 *             description: Usuário não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário não encontrado
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 * /api/users/therapist/profile:
 *    put:
 *       summary: Atualiza as informações do Terapeuta autenticado
 *       tags: [Therapist]
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                         type: string
 *                      speciality:
 *                         type: array
 *                         items:
 *                            type: string
 *                      mediumCost:
 *                         type: number
 *                      phoneNumber:
 *                         type: string
 *                      location:
 *                         type: object
 *                         properties:
 *                            type:
 *                               type: string
 *                               example: Point
 *                            coordinates:
 *                               type: array
 *                               items:
 *                                  type: number
 *                               minItems: 2
 *                               maxItems: 2
 *                               example: [1, 1]
 *       responses:
 *          200:
 *             description: Fisioterapeuta atualizado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         updatedUser:
 *                            type: object
 *                            properties:
 *                               _id:
 *                                  type: string
 *                               email:
 *                                  type: string
 *                               name:
 *                                  type: string
 *                               speciality:
 *                                  type: array
 *                                  items:
 *                                     type: string
 *                               mediumCost:
 *                                  type: number
 *                               phoneNumber:
 *                                  type: string
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [1, 1]
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          404:
 *             description: Usuário não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário não encontrado
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/users/profile/delete:
 *    delete:
 *       summary: Deleta o perfil do usuário autenticado
 *       tags: [Users]
 *       responses:
 *          200:
 *             description: Usuário deletado com sucesso
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário deletado
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          404:
 *             description: Usuário não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário não encontrado
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       Client:
 *          type: object
 *          required:
 *             - name
 *             - email
 *             - password
 *             - location
 *          properties:
 *             name:
 *                type: string
 *                description: Nome do cliente
 *             email:
 *                type: string
 *                description: Email do cliente
 *                example: email@email.com
 *             password:
 *                type: string
 *                description: Senha do cliente
 *             location:
 *                type: object
 *                properties:
 *                   type:
 *                      type: string
 *                      example: Point
 *                   coordinates:
 *                      type: array
 *                      items:
 *                         type: number
 *                      minItems: 2
 *                      maxItems: 2
 *                      example: [0, 0]
 *                description: Localização do cliente
 *
 */

/**
 * @swagger
 * /api/auth/client/register:
 *    post:
 *       summary: Registra um novo cliente
 *       tags: [Client]
 *       security: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Client'
 *       responses:
 *          201:
 *             description: Cliente registrado com sucesso
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         token:
 *                            type: string
 *                         user:
 *                            type: object
 *                            properties:
 *                               id:
 *                                  type: string
 *                               name:
 *                                  type: string
 *                               email:
 *                                  type: string
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [0, 0]
 *          409:
 *             description: Usuário já existente
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         status:
 *                            type: number
 *                            example: 409
 *                         message:
 *                            type: string
 *                            example: Usuário já existente
 *          400:
 *             description: Erro de validação para campos requiridos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         status:
 *                            type: number
 *                            example: 400
 *                         message:
 *                            type: string
 *                            example: O nome é obrigatório
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/auth/client/login:
 *    post:
 *       summary: Faz o login de um cliente
 *       tags: [Client]
 *       security: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      email:
 *                         type: string
 *                         example: email@email.com
 *                      password:
 *                         type: string
 *       responses:
 *          200:
 *             description: Usuário logado com sucesso
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         token:
 *                            type: string
 *                         user:
 *                            type: object
 *                            properties:
 *                               id:
 *                                  type: string
 *                               name:
 *                                  type: string
 *                               email:
 *                                  type: string
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [0, 0]
 *          400:
 *             description: Erro de validação para campos requiridos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: E-mail é obrigatório
 *          404:
 *             description: Usuário não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário não encontrado
 *          401:
 *             description: E-mail ou senha incorretos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: E-mail ou senha inválidos
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 *
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       Therapist:
 *          type: object
 *          required:
 *             - name
 *             - email
 *             - password
 *             - phoneNumber
 *             - speciality
 *             - mediumCost
 *             - location
 *             - inscriptionNumber
 *          properties:
 *             name:
 *                type: string
 *                description: Nome do terapeuta
 *             email:
 *                type: string
 *                description: Email do terapeuta
 *                example: email@email.com
 *             password:
 *                type: string
 *                description: Senha do terapeuta
 *             phoneNumber:
 *                type: string
 *                description: Telefone do terapeuta
 *             speciality:
 *                type: array
 *                items:
 *                   type: string
 *                description: Especialidades do terapeuta
 *             mediumCost:
 *                type: number
 *                description: Custo médio do terapeuta
 *             location:
 *                type: object
 *                properties:
 *                   type:
 *                      type: string
 *                      example: Point
 *                   coordinates:
 *                      type: array
 *                      items:
 *                         type: number
 *                      minItems: 2
 *                      maxItems: 2
 *                      example: [0, 0]
 *                description: Localização do terapeuta
 *             inscriptionNumber:
 *                type: string
 *                description: Número de inscrição no registro de classe do terapeuta
 */

/**
 * @swagger
 * /api/auth/therapist/register:
 *    post:
 *       summary: Registra um novo fisioterapeuta
 *       tags: [Therapist]
 *       security: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Therapist'
 *       responses:
 *          201:
 *             description: Terapeuta registrado com sucesso
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                            token:
 *                               type: string
 *                            user:
 *                               type: object
 *                               properties:
 *                                  id:
 *                                     type: string
 *                                  name:
 *                                     type: string
 *                                  email:
 *                                     type: string
 *                                  phoneNumber:
 *                                     type: string
 *                                  speciality:
 *                                     type: array
 *                                     items:
 *                                        type: string
 *                                  mediumCost:
 *                                     type: number
 *                                  inscriptionNumber:
 *                                     type: string
 *                                  location:
 *                                     type: object
 *                                     properties:
 *                                        type:
 *                                           type: string
 *                                           example: Point
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: number
 *                                           minItems: 2
 *                                           maxItems: 2
 *                                           example: [0, 0]
 *          409:
 *             description: Usuário já existente
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         status:
 *                            type: number
 *                            example: 409
 *                         message:
 *                            type: string
 *                            example: Usuário já existente
 *          400:
 *             description: Erro de validação para campos requiridos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         status:
 *                            type: number
 *                            example: 400
 *                         message:
 *                            type: string
 *                            example: O nome é obrigatório
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/auth/therapist/login:
 *    post:
 *       summary: Faz o login de um fisioterapeuta
 *       tags: [Therapist]
 *       security: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      email:
 *                         type: string
 *                         example: email@email.com
 *                      password:
 *                         type: string
 *       responses:
 *          200:
 *             description: Terapeuta logado com sucesso
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         token:
 *                            type: string
 *                         user:
 *                            type: object
 *                            properties:
 *                               id:
 *                                  type: string
 *                               name:
 *                                  type: string
 *                               email:
 *                                  type: string
 *                               mediumCost:
 *                                  type: number
 *                               speciality:
 *                                  type: array
 *                                  items:
 *                                     type: string
 *                               inscriptionNumber:
 *                                  type: string
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [0, 0]
 *          400:
 *             description: Erro de validação para campos requiridos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: E-mail é obrigatório
 *          404:
 *             description: Usuário não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Usuário não encontrado
 *          401:
 *             description: E-mail ou senha incorretos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: E-mail ou senha inválidos
 *          500:
 *             description: Erro do servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 */

/**
 * @swagger
 * /api/search/getalltherapists:
 *    get:
 *       summary: Obtém a lista de todos os fisioterapeutas cadastrados
 *       security: []
 *       tags: [Search]
 *       responses:
 *        200:
 *          description: Lista de todos os fisioterapeutas
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      therapists:
 *                         type: array
 *                         items:
 *                            type: object
 *                            properties:
 *                               name:
 *                                  type: string
 *                               email:
 *                                  type: string
 *                               phoneNumber:
 *                                  type: string
 *                               speciality:
 *                                  type: array
 *                                  items:
 *                                     type: string
 *                               mediumCost:
 *                                  type: number
 *                               location:
 *                                  type: object
 *                                  properties:
 *                                     type:
 *                                        type: string
 *                                        example: Point
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: number
 *                                        minItems: 2
 *                                        maxItems: 2
 *                                        example: [0, 0]
 *                               inscriptionNumber:
 *                                  type: string
 *        204:
 *         description: Nenhum fisioterapeuta cadastrado
 *        500:
 *          description: Erro no servidor
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      message:
 *                         type: string
 *                         example: Erro interno do servidor
 *
 * /api/search/therapistbyname:
 *    get:
 *       summary: Obtém todos os fisioterapeutas que contenham um determinado nome
 *       security: []
 *       tags: [Search]
 *       parameters:
 *          -  in: query
 *             name: name
 *             schema:
 *                type: string
 *             description: Nome do terapeuta
 *       responses:
 *          200:
 *             description: Lista de fisioterapeutas
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         therapists:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  name:
 *                                     type: string
 *                                  email:
 *                                     type: string
 *                                  phoneNumber:
 *                                     type: string
 *                                  speciality:
 *                                     type: array
 *                                     items:
 *                                        type: string
 *                                  mediumCost:
 *                                     type: number
 *                                  location:
 *                                     type: object
 *                                     properties:
 *                                        type:
 *                                           type: string
 *                                           example: Point
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: number
 *                                           minItems: 2
 *                                           maxItems: 2
 *                                           example: [0, 0]
 *                                  inscriptionNumber:
 *                                     type: string
 *          204:
 *             description: Nenhum fisioterapeuta cadastrado
 *          500:
 *             description: Erro no servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/search/therapists:
 *    get:
 *       summary: Obtém todos os fisioterapeutas que correspondam a query
 *       tags: [Search]
 *       security: []
 *       parameters:
 *          -  in: query
 *             name: location
 *             schema:
 *                type: string
 *             description: Localização do cliente
 *          -  in: query
 *             name: speciality
 *             schema:
 *                type: string
 *             description: Especialidade do terapeuta
 *          -  in: query
 *             name: maxDistance
 *             schema:
 *                type: number
 *             description: Distância máxima do terapeuta em relação ao cliente
 *          -  in: query
 *             name: minCost
 *             schema:
 *                type: number
 *             description: Custo mínimo do terapeuta
 *          -  in: query
 *             name: maxCost
 *             schema:
 *                type: number
 *             description: Custo máximo do terapeuta
 *       responses:
 *          200:
 *             description: Lista de fisioterapeutas
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         therapists:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  name:
 *                                     type: string
 *                                  email:
 *                                     type: string
 *                                  phoneNumber:
 *                                     type: string
 *                                  speciality:
 *                                     type: array
 *                                     items:
 *                                        type: string
 *                                  mediumCost:
 *                                     type: number
 *                                  location:
 *                                     type: object
 *                                     properties:
 *                                        type:
 *                                           type: string
 *                                           example: Point
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: number
 *                                           minItems: 2
 *                                           maxItems: 2
 *                                           example: [0, 0]
 *                                  inscriptionNumber:
 *                                     type: string
 *          204:
 *             description: Nenhum fisioterapeuta cadastrado
 *          500:
 *             description: Erro no servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/search/therapist/{therapistId}:
 *    get:
 *       summary: Obtém um fisioterapeuta pelo seu ID
 *       security: []
 *       tags: [Search]
 *       parameters:
 *          -  in: params
 *             name: therapistId
 *             schema:
 *                type: string
 *             description: ID do terapeuta
 *       responses:
 *          200:
 *             description: Dados do fisioterapeuta
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         therapists:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  name:
 *                                     type: string
 *                                  email:
 *                                     type: string
 *                                  phoneNumber:
 *                                     type: string
 *                                  speciality:
 *                                     type: array
 *                                     items:
 *                                        type: string
 *                                  mediumCost:
 *                                     type: number
 *                                  location:
 *                                     type: object
 *                                     properties:
 *                                        type:
 *                                           type: string
 *                                           example: Point
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: number
 *                                           minItems: 2
 *                                           maxItems: 2
 *                                           example: [0, 0]
 *                                  inscriptionNumber:
 *                                     type: string
 *          404:
 *             description: Fisioterapeuta não encontrado
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Fisioterapeuta não encontrado
 *          500:
 *             description: Erro no servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 */
/**
 * @swagger
 * components:
 *    schemas:
 *       Consultation:
 *          type: object
 *          required:
 *             - clientId
 *             - therapistId
 *             - date
 *             - time
 *             - status
 *          properties:
 *             clientId:
 *                type: string
 *                description: ID do cliente
 *             therapistId:
 *                type: string
 *                description: ID do terapeuta
 *             date:
 *                type: date
 *                description: Data da consulta
 *             time:
 *                type: date
 *                description: Horário da consulta
 *             status:
 *                type: string
 *                description: Status da consulta
 *          example:
 *             clientId: 60d0fe4f5311236168a109cb
 *             therapistId: 60d0fe4f5311236168a109ca
 *             date: 2024-08-24T00:00:00.000Z
 *             time: 08:00:00
 *             status: scheduled
 */

/**
 * @swagger
 * /api/schedule/create:
 *    post:
 *       summary: Cria uma nova consulta
 *       tags: [Consultations]
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Consultation'
 *       responses:
 *          201:
 *             description: Consulta criada com sucesso
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Consultation'
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          400:
 *             description: Erro de validação para campos requiridos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: A data e hora da consulta são obrigatórias
 *          404:
 *             description: Fisioterapeuta não existe
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         success:
 *                            type: boolean
 *                            example: false
 *                         message:
 *                            type: string
 *                            example: Fisioterapeuta não encontrado
 *          409:
 *             description: Consulta já existente
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Já existe consulta agendada para esse horário
 *          500:
 *             description: Erro no servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/schedule/consultations:
 *    get:
 *       summary: Obtém todas as consultas agendadas em determinada data
 *       tags: [Consultations]
 *       parameters:
 *          -  in: query
 *             name: therapistId
 *             schema:
 *                type: string
 *             required: true
 *             description: ID do terapeuta
 *          -  in: query
 *             name: date
 *             schema:
 *                type: date
 *             required: true
 *             description: Data da consulta
 *       responses:
 *          200:
 *             description: Lista de consultas
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         consultations:
 *                            type: array
 *                            items:
 *                               $ref: '#/components/schemas/Consultation'
 *          204:
 *             description: Nenhuma consulta encontrada
 *          400:
 *             description: ID do terapeuta ou data inválidos
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: ID do terapeuta ou data incorretos
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          500:
 *             description: Erro no servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 *
 * /api/schedule/history:
 *    get:
 *       summary: Obtém todas as consultas do cliente
 *       tags: [Consultations]
 *       parameters:
 *          -  in: query
 *             name: clientId
 *             schema:
 *                type: string
 *             required: true
 *             description: ID do cliente
 *       responses:
 *          200:
 *             description: Lista de consultas
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         consultations:
 *                            type: array
 *                            items:
 *                               $ref: '#/components/schemas/Consultation'
 *          204:
 *             description: Nenhuma consulta encontrada
 *          401:
 *             description: Necessário autenticação
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Nenhum token de autenticação fornecido
 *          500:
 *             description: Erro no servidor
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 *                            example: Erro interno do servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - therapistId
 *         - rating
 *         - comment
 *       properties:
 *         therapistId:
 *           type: string
 *           description: ID do terapeuta
 *         rating:
 *           type: number
 *           description: Avaliação do terapeuta
 *         comment:
 *           type: string
 *           description: Comentário sobre o terapeuta
 *       example:
 *         therapistId: 60d0fe4f5311236168a109ca
 *         rating: 5
 *         comment: Excelente terapeuta!
 */

/**
 * @swagger
 * /api/review/create:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  clientId:
 *                   type: string
 *                  therapistId:
 *                   type: string
 *                  rating:
 *                   type: number
 *                  comment:
 *                   type: string
 *                  _id:
 *                   type: string
 *                  createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *          description: Necessário autenticação
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      message:
 *                         type: string
 *                         example: Nenhum token de autenticação fornecido
 *       404:
 *          description: Terapeuta não encontrado
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terapeuta não encontrado
 *       400:
 *          description: Erro de validação para campos requiridos
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      message:
 *                         type: string
 *                         example: A classificação é obrigatória
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor
 *
 * /api/review/{therapistId}:
 *   get:
 *     summary: Obtém todas as avaliações de um terapeuta específico
 *     tags: [Reviews]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: therapistId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do terapeuta
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       204:
 *         description: Nenhuma avaliação encontrada
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor
 */
