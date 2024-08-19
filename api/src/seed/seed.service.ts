import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import POKEMONS from 'src/data/pokemons';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async seed() {
    try {
      for (const pokemon of POKEMONS) {
        await this.pokemonRepository.save(pokemon);
      }

      console.log('----- POKEMONS CARGADOS CON EXITO -----');
    } catch (e) {
      console.log('Hubo un error al cargar los pokemons');
      throw new Error(e);
    }
  }
}
