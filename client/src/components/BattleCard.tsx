import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import { Pokemon } from "../@types";

interface BattleCardProps extends Pokemon {}

const BattleCard: React.FC<BattleCardProps> = ({
  id,
  attack,
  defense,
  hp,
  imageUrl,
  name,
  speed,
  type,
}) => {
  return (
    <Card
      sx={{
        maxWidth: "40%",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
        borderRadius: 2,
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={{ width: "40%", marginX: "auto" }}
      />
      <CardContent sx={{ borderTop: "1px solid #e6e6e6", marginX: 2, px: 0 }}>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {type}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <LinearProgressComponent title="HP" value={hp} />
          <LinearProgressComponent title="Attack" value={attack} />
          <LinearProgressComponent title="Defense" value={defense} />
          <LinearProgressComponent title="Speed" value={speed} />
        </Box>
      </CardContent>
    </Card>
  );
};

interface LinearProgressProps {
  title: string;
  value: number;
}

const LinearProgressComponent: React.FC<LinearProgressProps> = ({
  title,
  value,
}) => {
  return (
    <>
      <Typography variant="subtitle2" fontSize={12}>
        {title}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(value / 10) * 100}
        sx={{
          mb: 1,
          height: "8px",
          borderRadius: 99,
          bgcolor: "#e5e5e5",
          "& .MuiLinearProgress-bar": {
            bgcolor: "#71FB46",
          },
        }}
      />
    </>
  );
};

export default BattleCard;
