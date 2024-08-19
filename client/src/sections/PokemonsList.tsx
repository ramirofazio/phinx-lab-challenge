import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import SimpleCard from "../components/SimpleCard";
import { usePokemonContext } from "../contexts/PokemonContext";

const PokemonList: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();
  const { setSelectedPokemon } = usePokemonContext();

  return (
    <Container disableGutters sx={{ marginBottom: 3 }}>
      <Typography variant="h6">Select your pokemon</Typography>

      <Grid container justifyContent={"space-between"} pt={2}>
        {loading && <CircularProgress />}
        {pokemons &&
          !loading &&
          pokemons.map((pokemon) => (
            <Grid item xs={"auto"}>
              <SimpleCard
                {...pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default PokemonList;
