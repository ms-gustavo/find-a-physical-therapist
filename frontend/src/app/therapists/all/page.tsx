"use client";

import { fetchTherapistsWithAddresses } from "@/utils/fetchAddress";
import { getAllTherapists } from "@/utils/serverRequests";
import React, { useEffect, useState } from "react";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";

export interface Therapist {
  name: string;
  email: string;
  phoneNumber: string;
  speciality: string[];
  mediumCost: number;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  inscriptionNumber: string;
  address?: {
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
}

const TherapistsPage = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllTherapists();
        if (response.status !== 200) {
          console.log("erro");
          return;
        }
        const therapistsData = response.data.therapists as Therapist[];
        const therapistsWithAddresses = await fetchTherapistsWithAddresses(
          therapistsData
        );
        setTherapists(therapistsWithAddresses);
      } catch (error: any) {
        console.error(`${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Todos os Fisioterapeutas
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
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
                {therapist.address!.road}, {therapist.address!.city} -{" "}
                {therapist.address!.state}
              </p>
              <p className="text-gray-500">
                CEP: {therapist.address!.postcode}
              </p>
              <p className="text-gray-500">
                Custo médio: R${therapist.mediumCost}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default TherapistsPage;
