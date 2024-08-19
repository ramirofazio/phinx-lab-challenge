import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import { Pokemon } from "../@types";
import { motion } from "framer-motion";
import { slideToTop } from "../utils/anim";

interface BattleCardProps extends Pokemon {
  index: number;
  blur?: boolean;
}

const BattleCard: React.FC<BattleCardProps> = ({
  id,
  attack,
  defense,
  hp,
  imageUrl,
  name,
  speed,
  type,
  index,
  blur,
}) => {
  return (
    <Box
      component={motion.div}
      maxWidth={{ xs: "100%", md: "40%" }}
      boxShadow={"2px 2px 10px #2e2e2e50"}
      borderRadius={2}
      variants={slideToTop}
      custom={index}
      initial="initial"
      animate="enter"
      exit="exit"
      key={id}
      overflow={"hidden"}
    >
      <Card
        sx={{
          filter: blur ? "blur(16px) grayscale(80%)" : "none",
          transition: "filter 0.3s ease-in-out",
          py: 2,
          pointerEvents: "none",
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
            {type.map((t) => t + " ")}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LinearProgressComponent title="HP" value={hp} />
            <LinearProgressComponent title="Attack" value={attack} />
            <LinearProgressComponent title="Defense" value={defense} />
            <LinearProgressComponent title="Speed" value={speed} />
          </Box>
        </CardContent>
      </Card>
    </Box>
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
