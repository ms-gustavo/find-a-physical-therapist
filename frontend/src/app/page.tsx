import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <section className="w-full max-w-3xl text-center py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Encontre o Fisioterapeuta Ideal para Você
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Conectando pacientes a fisioterapeutas especializados em sua área.
        </p>
        <Link
          href="/therapists/all"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Visualizar todos os fisioterapeutas
        </Link>
      </section>

      {/* Seções de Destaque */}
      <section className="w-full max-w-5xl py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
          Categorias Populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cada categoria seria um card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            Fisioterapia Esportiva
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            Ortopédica
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            Pediátrica
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            Respiratória
          </div>
        </div>
      </section>

      {/* Testemunhos */}
      <section className="w-full max-w-5xl py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
          O que dizem nossos pacientes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cada testemunho seria um card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Excelente atendimento, muito profissional!</p>
            <p className="text-sm mt-4 text-right text-gray-600">- João S.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Recuperei minhas dores nas costas rapidamente!</p>
            <p className="text-sm mt-4 text-right text-gray-600">- Maria R.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Recomendo a todos, ótimo serviço!</p>
            <p className="text-sm mt-4 text-right text-gray-600">- Carlos M.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center bg-gray-800 text-white">
        <p>
          &copy; 2024 Find a Physical Therapist. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
};

export default HomePage;
