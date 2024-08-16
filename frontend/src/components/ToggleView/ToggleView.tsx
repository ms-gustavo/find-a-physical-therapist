import React, { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ToggleView = ({
  onChangeView,
}: {
  onChangeView: (view: string) => void;
}) => {
  const [view, setView] = useState("list");
  const { data: session } = useSession();

  const handleToggle = (viewType: string) => {
    if (viewType === "map" && !session) {
      toast.error(
        "Você precisa estar autenticado para ver os fisioterapeutas no mapa."
      );
      return;
    }
    setView(viewType);
    onChangeView(viewType);
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        onClick={() => handleToggle("list")}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          view === "list"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        Lista
      </button>
      <button
        onClick={() => handleToggle("map")}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          view === "map"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        Mapa
      </button>
    </div>
  );
};

export default ToggleView;
