import ClientRegisterForm from "@/components/Forms/ClientRegisterForm/ClientRegisterForm";

const ClientRegisterPage = () => {
  return (
    <div className="mx-auto p-4 bg-background rounded-lg space-y-6">
      <h1 className="text-2xl text-center font-bold mb-4">
        Registrar como Paciente
      </h1>
      <ClientRegisterForm />
    </div>
  );
};

export default ClientRegisterPage;
