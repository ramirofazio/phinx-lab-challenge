import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import SimpleCard from "../components/SimpleCard";
import { usePokemonContext } from "../contexts/PokemonContext";
import { Pokemon } from "../@types";
import { motion } from "framer-motion";

const PokemonList: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();
  const { selectedPokemon, setSelectedPokemon, resetWinner } =
    usePokemonContext();

  const handleChangePokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    resetWinner();
  };

  return (
    <Container disableGutters sx={{ marginBottom: { xs: 10, md: 3 } }}>
      <Box
        component={motion.div}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ delay: 0.9, type: "spring", duration: 0.8 }}
      >
        <Typography variant="h6">Select your pokemon</Typography>
      </Box>

      <Grid
        container
        justifyContent={{
          xs: "center",
          md: "space-between",
        }}
        alignItems={"center"}
        gap={3}
        pt={2}
      >
        {loading && (
          <CircularProgress color="inherit" size={50} sx={{ mx: "auto" }} />
        )}
        {pokemons &&
          !loading &&
          pokemons.map((pokemon, index) => (
            <Grid item xs={"auto"} key={index}>
              <SimpleCard
                {...pokemon}
                onClick={() => handleChangePokemon(pokemon)}
                isDisabled={selectedPokemon === pokemon}
                index={index}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default PokemonList;
