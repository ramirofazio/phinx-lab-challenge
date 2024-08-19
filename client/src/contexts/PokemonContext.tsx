import React, { createContext, useState, useContext } from "react";
import { Pokemon } from "../@types";

interface PokemonContextType {
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon) => void;
  winner: Pokemon | null;
  setWinner: (pokemon: Pokemon) => void;
  resetWinner: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [winner, setWinner] = useState<Pokemon | null>(null);

  const resetWinner = () => {
    setWinner(null);
  };

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
        winner,
        setWinner,
        resetWinner,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};
