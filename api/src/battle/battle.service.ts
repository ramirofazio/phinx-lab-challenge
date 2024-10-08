import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from 'src/pokemon/pokemon.entity';
import { Repository } from 'typeorm';
import { PokemonsToBattleDTO } from './battle.dto';
import { Battle } from './battle.entity';
import { typeEffectiveness } from 'src/data/pokemons';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Battle) private battleRepository: Repository<Battle>,
  ) {}

  async battle({
    pokemon1Id,
    pokemon2Id,
  }: PokemonsToBattleDTO): Promise<Pokemon> {
    const pokemon1 = await this.pokemonRepository.findOneBy({ id: pokemon1Id });
    const pokemon2 = await this.pokemonRepository.findOneBy({ id: pokemon2Id });

    if (!pokemon1) {
      throw new NotFoundException(`Pokemon con ID ${pokemon1Id} no encontrado`);
    }
    if (!pokemon2) {
      throw new NotFoundException(`Pokemon con ID ${pokemon2Id} no encontrado`);
    }

    return this.calculateResult(pokemon1, pokemon2);
  }

  private async calculateResult(
    pokemon1: Pokemon,
    pokemon2: Pokemon,
  ): Promise<Pokemon> {
    let winner: Pokemon = null;

    // creo la batalla en la base de datos sin winner
    let battle = this.battleRepository.create({
      pokemon1: { ...pokemon1 },
      pokemon2: { ...pokemon2 },
      winner,
    });
    battle = await this.battleRepository.save(battle);

    // quien va primero
    let turn = pokemon1.speed > pokemon2.speed ? pokemon1.id : pokemon2.id;
    if (pokemon1.speed === pokemon2.speed) {
      turn = pokemon1.attack >= pokemon2.attack ? pokemon1.id : pokemon2.id;
    }

    // mientras ningun pokemon tenga hp 0 se sigue iterando
    while (battle.pokemon1.hp !== 0 && battle.pokemon2.hp !== 0) {
      let damage: number;

      if (turn === battle.pokemon1.id) {
        damage = this.calculateDamage(battle.pokemon1, battle.pokemon2);
        battle.pokemon2.hp = Math.max(battle.pokemon2.hp - damage, 0); // Evito hp negativo
      } else {
        damage = this.calculateDamage(battle.pokemon2, battle.pokemon1);
        battle.pokemon1.hp = Math.max(battle.pokemon1.hp - damage, 0); // Evito hp negativo
      }

      // defino el ganador
      if (battle.pokemon1.hp === 0 || battle.pokemon2.hp === 0) {
        winner = battle.pokemon1.hp > 0 ? battle.pokemon1 : battle.pokemon2;
        break;
      }

      // cambio turno
      turn =
        turn === battle.pokemon1.id ? battle.pokemon2.id : battle.pokemon1.id;
    }

    // actualizo el registro y retorno
    await this.battleRepository.update(battle.id, {
      winner: winner,
      pokemon1: battle.pokemon1,
      pokemon2: battle.pokemon2,
    });

    return winner;
  }

  private calculateDamage(attacker: Pokemon, defender: Pokemon): number {
    let baseDamage = attacker.attack - defender.defense;
    baseDamage = Math.max(baseDamage, 1);

    // calculo la efectividad del daño segun el type del atacante y defensor
    let typeModifier = 1;
    for (const attackerType of attacker.type) {
      for (const defenderType of defender.type) {
        // esto es un array de strings asi que los itero por si tienen mas de uno
        if (
          typeEffectiveness[attackerType]?.strongAgainst.includes(defenderType)
        ) {
          typeModifier *= 2; // super efectivo
        } else if (
          typeEffectiveness[attackerType]?.weakAgainst.includes(defenderType)
        ) {
          typeModifier *= 0.5; // poco efectivo
        }
      }
    }

    return baseDamage * typeModifier;
  }
}
