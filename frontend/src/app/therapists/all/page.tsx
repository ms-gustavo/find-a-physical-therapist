"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AllTherapists from "@/components/TherapistsLists/AllTherapists";
import SearchByName from "@/components/TherapistsLists/SearchByName";
import SearchByOptions from "@/components/TherapistsLists/SearchByOptions";

const TherapistsPage: React.FC = () => {
  const [activeView, setActiveView] = useState<"all" | "name" | "options">(
    "all"
  );

  const renderView = () => {
    switch (activeView) {
      case "all":
        return <AllTherapists />;
      case "name":
        return <SearchByName />;
      case "options":
        return <SearchByOptions />;
      default:
        return <AllTherapists />;
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Fisioterapeutas</h1>
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          onClick={() => setActiveView("all")}
          className={`btn ${
            activeView === "all" ? "btn-primary" : "btn-secondary"
          }`}
        >
          Todos os Fisioterapeutas
        </Button>
        <Button
          onClick={() => setActiveView("name")}
          className={`btn ${
            activeView === "name" ? "btn-primary" : "btn-secondary"
          }`}
        >
          Pesquisar por Nome
        </Button>
        <Button
          onClick={() => setActiveView("options")}
          className={`btn ${
            activeView === "options" ? "btn-primary" : "btn-secondary"
          }`}
        >
          Pesquisar por Opções
        </Button>
      </div>
      {renderView()}
    </main>
  );
};

export default TherapistsPage;
