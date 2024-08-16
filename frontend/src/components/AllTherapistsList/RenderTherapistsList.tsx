import { Therapist } from "@/app/therapists/all/page";

const RenderTherapistsList = (therapists: Therapist[]) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {therapists.map((therapist) => (
      <div
        key={therapist.inscriptionNumber}
        className="p-6 rounded-lg shadow-lg flex flex-col items-start"
      >
        <h2 className="text-xl font-semibold mb-2">{therapist.name}</h2>
        <h3>CREFITO: {therapist.inscriptionNumber}</h3>
        <p className="text-gray-700">{therapist.speciality.join(", ")}</p>
        <p className="text-gray-500">
          {therapist.address?.road}, {therapist.address?.city} -{" "}
          {therapist.address?.state}
        </p>
        <p className="text-gray-500">CEP: {therapist.address?.postcode}</p>
        <p className="text-gray-500">Custo médio: R${therapist.mediumCost}</p>
      </div>
    ))}
  </div>
);

export default RenderTherapistsList;
