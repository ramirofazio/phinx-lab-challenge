import { Card, CardMedia, Typography } from "@mui/material";
import { Pokemon } from "../@types";

interface SimpleCardProps extends Pokemon {
  onClick: () => void;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  id,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <Card
      id={String(id)}
      sx={{
        p: 2,
        width: "100px",
        boxShadow: "2px 2px 10px #2e2e2e50",
        borderRadius: 2,
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={{ width: "80%", marginX: "auto" }}
      />
      <Typography>{name}</Typography>
    </Card>
  );
};

export default SimpleCard;
