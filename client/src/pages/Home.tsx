import { Box, Container, Typography } from "@mui/material";
import PokemonList from "../sections/PokemonsList";
import BattlePokemons from "../sections/Battlepokemons";
import { usePokemonContext } from "../contexts/PokemonContext";
import { AnimatePresence, motion } from "framer-motion";

const Home: React.FC = () => {
  const { winner } = usePokemonContext();

  return (
    <Container
      sx={{
        padding: 2,
      }}
      maxWidth="md"
    >
      <Box
        component={motion.div}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ delay: 0.8, type: "spring", duration: 0.8 }}
      >
        <Typography variant="h4" component="h1" mb={2}>
          Battle of Pokemon
        </Typography>
      </Box>

      <PokemonList />
      <AnimatePresence mode="popLayout">
        {winner && (
          <Box
            key={winner.id}
            component={motion.div}
            p={2}
            border={"2px solid gray"}
            bgcolor={"rgb(228, 249, 254)"}
            mb={3}
            borderRadius={2}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            exit={{ opacity: 0, scale: 0.1 }}
          >
            <Typography variant="h6">{winner.name} wins!</Typography>
          </Box>
        )}
      </AnimatePresence>
      <BattlePokemons />
    </Container>
  );
};

export default Home;
