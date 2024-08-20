import React, { useEffect, useState } from "react";
import RenderTherapistsList from "@/components/TherapistsLists/RenderTherapistsList";
import { Paginate } from "@/components/Pagination/Paginate";
import { getAllTherapists } from "@/utils/serverRequests";
import { fetchTherapistsWithAddresses } from "@/utils/fetchAddress";
import { SkeletonCard } from "../SkeletonCard/SkeletonCard";

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

const AllTherapists: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllTherapists(currentPage);
        const totalPages = response.data.totalPages;
        const therapistsData = response.data.therapists as Therapist[];
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

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <RenderTherapistsList therapists={therapists} />
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default AllTherapists;
