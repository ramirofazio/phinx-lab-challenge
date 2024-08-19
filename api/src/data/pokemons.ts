const POKEMONS = [
  {
    id: 1,
    name: 'Pikachu',
    attack: 4,
    defense: 3,
    hp: 3,
    speed: 6,
    type: ['electric'],
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
  },
  {
    id: 2,
    name: 'Charmander',
    attack: 4,
    defense: 3,
    hp: 3,
    speed: 4,
    type: ['fire'],
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
  },
  {
    id: 3,
    name: 'Squirtle',
    attack: 3,
    defense: 4,
    hp: 3,
    speed: 3,
    type: ['water'],
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
  },
  {
    id: 4,
    name: 'Bulbasaur',
    attack: 4,
    defense: 3,
    hp: 3,
    speed: 3,
    type: ['grass', 'poison'],
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
  },
  {
    id: 5,
    name: 'Eevee',
    attack: 4,
    defense: 3,
    hp: 4,
    speed: 5,
    type: ['normal'],
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png',
  },
];

export default POKEMONS;

//? Mock types effectiveness to this 5 pokemons
export const typeEffectiveness = {
  fire: {
    strongAgainst: ['grass'],
    weakAgainst: ['water'],
  },
  water: {
    strongAgainst: ['fire'],
    weakAgainst: ['electric', 'grass'],
  },
  grass: {
    strongAgainst: ['water'],
    weakAgainst: ['fire', 'poison'],
  },
  electric: {
    strongAgainst: ['water'],
    weakAgainst: ['ground'],
  },
  normal: {
    strongAgainst: [],
    weakAgainst: ['fighting'],
  },
  poison: {
    strongAgainst: ['grass'],
    weakAgainst: ['ground', 'psychic'],
  },
};
