export type Pokemon = {
  id: number;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
};

export type PostBattle = {
  pokemon1Id: number;
  pokemon2Id: number;
};
