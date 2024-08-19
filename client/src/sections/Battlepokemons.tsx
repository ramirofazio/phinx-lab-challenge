import { Box, Button, CircularProgress } from "@mui/material";
import BattleCard from "../components/BattleCard";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../@types";
import { usePostBattle } from "../hooks/usePostBattle";
import { AnimatePresence } from "framer-motion";

const BattlePokemons: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();
  const { postBattle, winner, loading: battleLoading } = usePostBattle();
  const {
    selectedPokemon,
    setWinner,
    winner: contextWinner,
  } = usePokemonContext();

  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
  const [blurOpponent, setBlurOpponent] = useState<boolean>(true);

  const getRandomOpponent = useCallback(() => {
    if (!loading && pokemons) {
      const filteredPokemons = pokemons.filter(
        (p) => p.id !== selectedPokemon?.id
      );
      const randomIndex = Math.floor(Math.random() * filteredPokemons.length);
      setOpponentPokemon(filteredPokemons[randomIndex]);
    }
  }, [selectedPokemon, pokemons, loading]);

  const handleStartBattle = () => {
    if (!selectedPokemon || !opponentPokemon) return null;
    setBlurOpponent(false);
    postBattle({
      pokemon1Id: selectedPokemon.id,
      pokemon2Id: opponentPokemon.id,
    });
  };

  useEffect(() => {
    getRandomOpponent();
  }, [selectedPokemon, getRandomOpponent]);

  useEffect(() => {
    setBlurOpponent(true);
  }, [selectedPokemon]);

  useEffect(() => {
    if (winner && !battleLoading) {
      setWinner(winner);
    }
  }, [winner, setWinner, battleLoading]);

  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "center", md: "unset" }}
      gap={2}
    >
      <AnimatePresence mode="wait">
        {selectedPokemon && <BattleCard {...selectedPokemon} index={0} />}
      </AnimatePresence>
      {selectedPokemon && opponentPokemon && (
        <Button
          disabled={battleLoading || Boolean(contextWinner)}
          variant="contained"
          color="success"
          sx={{ height: "50px", alignSelf: "center", width: "150px" }}
          onClick={handleStartBattle}
        >
          {battleLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Start Battle"
          )}
        </Button>
      )}
      <AnimatePresence mode="wait">
        {opponentPokemon && selectedPokemon && (
          <BattleCard {...opponentPokemon} index={1} blur={blurOpponent} />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default BattlePokemons;
