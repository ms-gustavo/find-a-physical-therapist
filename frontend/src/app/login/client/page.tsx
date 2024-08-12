import ClientLoginForm from "@/components/Forms/ClientLoginForm/ClientLoginForm";

const ClientLoginPage = () => {
  return (
    <div className="mx-auto p-4 bg-background rounded-lg space-y-6">
      <h1 className="text-2xl text-center font-bold mb-4">
        Login como Paciente
      </h1>
      <ClientLoginForm />
    </div>
  );
};

export default ClientLoginPage;
