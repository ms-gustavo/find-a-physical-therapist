"use client";

import { fetchTherapistsWithAddresses } from "@/utils/fetchAddress";
import {
  getAllTherapists,
  getTherapistsByName,
  getTherapistsByQuery,
} from "@/utils/serverRequests";
import React, { useEffect, useState } from "react";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ToggleView from "@/components/ToggleView/ToggleView";
import RenderTherapistsList from "@/components/AllTherapistsList/RenderTherapistsList";
import RenderTherapistsMap from "@/components/AllTherapistsList/RenderTherapistsMap";
import SearchForm from "@/components/SearchForm/SearchForm";
import { Paginate } from "@/components/Pagination/Paginate";

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
  const [view, setView] = useState("list");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (view !== "list") {
          response = await getAllTherapists(currentPage, 1000);
        }
        response = await getAllTherapists(currentPage);
        if (response.status !== 200) {
          toast.error("Erro ao carregar a página, tente novamente");
          return;
        }
        const totalPages = response.data.totalPages;
        const therapistsData = response.data.therapists as Therapist[];
        const therapistsWithAddresses = await fetchTherapistsWithAddresses(
          therapistsData
        );
        setTherapists(therapistsWithAddresses);
        setTotalPages(totalPages);
      } catch (error: any) {
        toast.error("Erro ao carregar a página, tente novamente");
        console.error(`${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (session) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          toast(
            "Para utilizar todas as funcionalidades é necessário ativar a localização"
          );
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [session, currentPage, view]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = async (params: any) => {
    setLoading(true);
    try {
      const results =
        params.name !== undefined
          ? await getTherapistsByName(params.name)
          : await getTherapistsByQuery(params);
      if (results.length === 0) {
        setTherapists([]);
        return toast("Não há terapeutas cadastrados baseados na sua pesquisa", {
          icon: "😕",
        });
      }
      const therapistsWithAddresses = await fetchTherapistsWithAddresses(
        results.therapists
      );

      setTherapists(therapistsWithAddresses);
    } catch (error: any) {
      toast.error(error.message);
      console.error("erro", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Fisioterapeutas</h1>
      <ToggleView onChangeView={setView} />
      <SearchForm onSearch={handleSearch} userLocation={userLocation!} />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : therapists.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          Não há terapeutas cadastrados baseados na sua pesquisa.
        </p>
      ) : view === "list" ? (
        therapists && (
          <>
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {RenderTherapistsList(therapists)}
          </>
        )
      ) : (
        userLocation && (
          <div style={{ height: "500px" }}>
            <RenderTherapistsMap
              userLocation={userLocation}
              therapists={therapists}
            />
          </div>
        )
      )}
    </main>
  );
};

export default TherapistsPage;
