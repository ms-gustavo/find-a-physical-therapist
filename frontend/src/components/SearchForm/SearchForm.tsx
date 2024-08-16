import { useState } from "react";
import { useSession } from "next-auth/react";

interface SearchFormProps {
  onSearch: (params: any) => void;
  userLocation: [number, number];
}

const SearchForm = ({ onSearch, userLocation }: SearchFormProps) => {
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [maxDistance, setMaxDistance] = useState<number | null>(null);
  const [minCost, setMinCost] = useState<number | null>(null);
  const [maxCost, setMaxCost] = useState<number | null>(null);
  const { data: session } = useSession();

  const handleSearch = () => {
    const searchParams: any = {};
    if (searchType === "name") {
      searchParams.name = searchValue;
    } else {
      if (speciality) searchParams.speciality = speciality;
      if (maxDistance) searchParams.maxDistance = maxDistance;
      if (minCost) searchParams.minCost = minCost;
      if (maxCost) searchParams.maxCost = maxCost;

      if (session) {
        if (userLocation) {
          searchParams.location = userLocation.join(",");
        }
      }
    }
    onSearch(searchParams);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-4 mb-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="name">Buscar por Nome</option>
        <option value="query">Buscar por Opções</option>
      </select>

      {searchType === "name" ? (
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Digite o nome do fisioterapeuta"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      ) : (
        <>
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
        </>
      )}

      <button
        onClick={handleSearch}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchForm;
