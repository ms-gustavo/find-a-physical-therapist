<h1>Backend - Sistema de Conexão Pacientes e Terapeutas</h1>

   <h2>Descrição</h2>
    <p>Este projeto é o backend de um sistema que conecta pacientes a terapeutas, inicialmente focado em fisioterapeutas, mas com a possibilidade de expansão para outras modalidades. O sistema permite o cadastro de clientes e terapeutas, edição de dados, filtragem de terapeutas por nome, custo médio, localização, agendamento de consultas, histórico de consultas e criação de feedbacks sobre os terapeutas.</p>

  <h2>Instalação</h2>
    <ol>
        <li>Clone este repositório.</li>
        <li>Instale as dependências do projeto usando o comando <code>npm install</code>.</li>
        <li>Configure as variáveis de ambiente necessárias no arquivo <code>.env</code>.</li>
        <li>Inicie o servidor com o comando <code>npm start</code>.</li>
    </ol>
    <h2>Scripts Disponíveis</h2>
    <ul>
        <li><code>npm start</code>: Inicia o servidor em modo de desenvolvimento usando <code>nodemon</code>.</li>
        <li><code>npm test</code>: Executa os testes usando <code>jest</code>.</li>
    </ul>
    <h2>Principais Dependências</h2>
    <ul>
        <li><code>express</code>: Framework de servidor web.</li>
        <li><code>mongoose</code>: ODM para MongoDB.</li>
        <li><code>jsonwebtoken</code>: Geração e verificação de tokens JWT.</li>
        <li><code>bcryptjs</code>: Hashing de senhas.</li>
        <li><code>joi</code>: Validação de dados.</li>
        <li><code>swagger-jsdoc</code> e <code>swagger-ui-express</code>: Geração e exibição de documentação de API.</li>
    </ul>
    <h2>Documentação da API</h2>
    <p>A documentação completa da API pode ser acessada após iniciar o projeto, em <code>localhost:5000/api-docs</code>.</p>
