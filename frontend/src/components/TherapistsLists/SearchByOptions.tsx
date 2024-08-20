import React, { useEffect, useState } from "react";
import { getTherapistsByQuery } from "@/utils/serverRequests";
import { Therapist } from "./AllTherapists";
import RenderTherapistsList from "./RenderTherapistsList";
import { SkeletonCard } from "../SkeletonCard/SkeletonCard";
import { Paginate } from "../Pagination/Paginate";
import { fetchTherapistsWithAddresses } from "@/utils/fetchAddress";

const SearchByOptions: React.FC = () => {
  const [speciality, setSpeciality] = useState("");
  const [maxDistance, setMaxDistance] = useState<number | null>(null);
  const [minCost, setMinCost] = useState<number | null>(null);
  const [maxCost, setMaxCost] = useState<number | null>(null);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = {
        speciality,
        maxDistance,
        minCost,
        maxCost,
        page: currentPage,
      };
      const response = await getTherapistsByQuery(query, currentPage);
      const totalPages = response.totalPages;
      const therapistsData = response.therapists as Therapist[];
      const therapistsWithAddresses = await fetchTherapistsWithAddresses(
        therapistsData
      );
      setTherapists(therapistsWithAddresses);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <input
        type="text"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        placeholder="Especialidade"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        value={maxDistance || ""}
        onChange={(e) => setMaxDistance(Number(e.target.value))}
        placeholder="Raio de distância (metros)"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <div className="flex space-x-4">
        <input
          type="number"
          value={minCost || ""}
          onChange={(e) => setMinCost(Number(e.target.value))}
          placeholder="Custo Mínimo"
          className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          value={maxCost || ""}
          onChange={(e) => setMaxCost(Number(e.target.value))}
          placeholder="Custo Máximo"
          className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 mb-2"
      >
        Pesquisar
      </button>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        therapists &&
        therapists.length > 0 && (
          <>
            <RenderTherapistsList therapists={therapists} />
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )
      )}
    </div>
  );
};

export default SearchByOptions;
