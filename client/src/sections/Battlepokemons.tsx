import { Button, CircularProgress, Container } from "@mui/material";
import BattleCard from "../components/BattleCard";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../@types";
import { usePostBattle } from "../hooks/usePostBattle";

const BattlePokemons: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();
  const { error, postBattle, winner, loading: battleLoading } = usePostBattle();
  const {
    selectedPokemon,
    setWinner,
    winner: contextWinner,
  } = usePokemonContext();

  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

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
    postBattle({
      pokemon1Id: selectedPokemon.id,
      pokemon2Id: opponentPokemon.id,
    });
  };

  useEffect(() => {
    getRandomOpponent();
  }, [selectedPokemon, getRandomOpponent]);

  useEffect(() => {
    if (error) {
      alert("Hubo un error en la pelea");
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (winner && !battleLoading) {
      setWinner(winner);
    }
  }, [winner, setWinner, battleLoading]);

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {selectedPokemon && <BattleCard {...selectedPokemon} />}
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
      {opponentPokemon && selectedPokemon && (
        <BattleCard {...opponentPokemon} />
      )}
    </Container>
  );
};

export default BattlePokemons;
