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
 *                   coordinates:
 *                      type: array
 *                      items:
 *                         type: string
 *                description: Localização do terapeuta
 *             inscriptionNumber:
 *                type: string
 *                description: Número de inscrição no registro de classe do terapeuta
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
 *                                     coordinates:
 *                                        type: array
 *                                        items:
 *                                           type: string
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
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: string
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
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: string
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
 *                                        coordinates:
 *                                           type: array
 *                                           items:
 *                                              type: string
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
 *               $ref: '#/components/schemas/Review'
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
