import { Box, Container, Typography } from "@mui/material";
import PokemonList from "../sections/PokemonsList";
import BattlePokemons from "../sections/Battlepokemons";
import { usePostBattle } from "../hooks/usePostBattle";

const Home: React.FC = () => {
  const { winner, loading } = usePostBattle();

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
      {winner && !loading && (
        <Box
          sx={{
            p: 2,
            border: "2px solid #71FB46",
            backgroundColor: "#71FB4640",
          }}
        >
          {winner.name} wins!
        </Box>
      )}
      <BattlePokemons />
    </Container>
  );
};

export default Home;
