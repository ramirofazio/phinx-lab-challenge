import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import { Container } from "@mui/material";

const Home: React.FC = () => {
  const { pokemons, loading } = useGetAllPokemons();

  return (
    <Container>
      {loading && <p>cargando...</p>}
      {pokemons &&
        !loading &&
        pokemons.map(({ id, imageUrl, name }) => (
          <div key={id}>
            <img src={imageUrl} alt={name} />

            <h4>{name}</h4>
          </div>
        ))}
    </Container>
  );
};

export default Home;
