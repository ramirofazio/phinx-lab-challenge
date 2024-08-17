import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import SimpleCard from "../components/SimpleCard";

const PokemonList: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();

  return (
    <Container disableGutters sx={{ marginBottom: 3 }}>
      <Typography variant="h6">Select you pokemon</Typography>

      <Grid container justifyContent={"space-between"} pt={2}>
        {loading && <CircularProgress />}
        {pokemons &&
          !loading &&
          pokemons.map((pokemon) => (
            <Grid item xs={"auto"}>
              <SimpleCard {...pokemon} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default PokemonList;
