import { Container, Typography } from "@mui/material";
import PokemonList from "../sections/PokemonsList";
import BattleCard from "../components/BattleCard";

const Home: React.FC = () => {
  return (
    <Container sx={{ padding: 2, overflow: "hidden" }} maxWidth="md">
      <Typography variant="h4" component="h1" mb={2}>
        Battle of Pokemon
      </Typography>
      <PokemonList />
      <BattleCard />
    </Container>
  );
};

export default Home;
