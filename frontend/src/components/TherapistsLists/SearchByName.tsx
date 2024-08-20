import React, { useEffect, useState } from "react";
import { getTherapistsByName } from "@/utils/serverRequests";
import { Therapist } from "./AllTherapists";
import RenderTherapistsList from "./RenderTherapistsList";
import { SkeletonCard } from "../SkeletonCard/SkeletonCard";
import { fetchTherapistsWithAddresses } from "@/utils/fetchAddress";
import { Paginate } from "../Pagination/Paginate";

const SearchByName: React.FC = () => {
  const [name, setName] = useState("");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch = async () => {
    console.log("handleSearch");
    setLoading(true);
    try {
      const response = await getTherapistsByName(name, currentPage);
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-2"
      />
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

export default SearchByName;
