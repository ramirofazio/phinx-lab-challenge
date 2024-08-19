import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { PokemonProvider } from "./contexts/PokemonContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PokemonProvider>
    <Home />
  </PokemonProvider>
);
