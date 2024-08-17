import { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../@types";
import API, { ApiRoutes } from "../api";

export const useGetAllPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    API.get(ApiRoutes.getAllPokemon)
      .then((res) => {
        setPokemons(res.data);
      })
      .catch((error) => {
        console.log("Hook error: ", error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { pokemons, loading, error };
};
