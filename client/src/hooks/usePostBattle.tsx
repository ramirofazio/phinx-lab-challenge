import { useCallback, useState } from "react";
import { Pokemon, PostBattle } from "../@types";
import API, { ApiRoutes } from "../api";

export const usePostBattle = () => {
  const [winner, setWinner] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postBattle = useCallback((body: PostBattle) => {
    setLoading(true);
    API.post(ApiRoutes.battle, body)
      .then((res) => {
        setWinner(res.data);
      })
      .catch((error) => {
        console.log("Hook error: ", error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000); //? Mock loading to implement Loader
      });
  }, []);

  return { winner, loading, error, postBattle };
};
