import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PokemonsToBattleDTO } from './battle.dto';
import { BattleService } from './battle.service';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  async battle(@Body() pokemonsToBattle: PokemonsToBattleDTO): Promise<any> {
    if (pokemonsToBattle.pokemon1Id === pokemonsToBattle.pokemon2Id) {
      throw new HttpException(
        `No se puede pelear con pokemons iguales`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.battleService.battle(pokemonsToBattle);
  }
}
