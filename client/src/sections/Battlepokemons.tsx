import { Button, Container } from "@mui/material";
import BattleCard from "../components/BattleCard";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../@types";
import { usePostBattle } from "../hooks/usePostBattle";

const BattlePokemons: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();
  const { error, loading: battleLoading, postBattle } = usePostBattle();
  const { selectedPokemon } = usePokemonContext();

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
          variant="contained"
          color="success"
          sx={{ height: "", alignSelf: "center" }}
          onClick={handleStartBattle}
        >
          Start Battle
        </Button>
      )}
      {opponentPokemon && selectedPokemon && (
        <BattleCard {...opponentPokemon} />
      )}
    </Container>
  );
};

export default BattlePokemons;
