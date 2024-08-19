import { Box, Container, Typography } from "@mui/material";
import PokemonList from "../sections/PokemonsList";
import BattlePokemons from "../sections/Battlepokemons";
import { usePokemonContext } from "../contexts/PokemonContext";

const Home: React.FC = () => {
  const { winner } = usePokemonContext();

  return (
    <Container
      sx={{
        padding: 2,
        overflow: "hidden",
        minHeight: "100vh",
      }}
      maxWidth="md"
    >
      <Typography variant="h4" component="h1" mb={2}>
        Battle of Pokemon
      </Typography>
      <PokemonList />
      {winner && (
        <Box
          sx={{
            p: 2,
            border: "2px solid gray",
            backgroundColor: "rgb(228, 249, 254)",
            mb: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">{winner.name} wins!</Typography>
        </Box>
      )}
      <BattlePokemons />
    </Container>
  );
};

export default Home;
