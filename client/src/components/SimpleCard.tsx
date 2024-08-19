import { Card, CardMedia, Typography } from "@mui/material";
import { Pokemon } from "../@types";

interface SimpleCardProps extends Pokemon {
  onClick: () => void;
  isDisabled: boolean;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  id,
  name,
  imageUrl,
  onClick,
  isDisabled,
}) => {
  return (
    <Card
      id={String(id)}
      sx={{
        p: 2,
        width: "100px",
        boxShadow: "2px 2px 10px #2e2e2e50",
        borderRadius: 2,
        pointerEvents: isDisabled ? "none" : "auto",
        opacity: isDisabled ? "50%" : "100%",
        cursor: isDisabled ? "not-allowed" : "pointer",

        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        transform: "scale(1)",

        ":hover": {
          transform: !isDisabled ? "scale(1.1)" : "scale(1)",
        },
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
