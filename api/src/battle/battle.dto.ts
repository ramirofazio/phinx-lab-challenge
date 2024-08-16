import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PokemonsToBattleDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pokemon1Id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pokemon2Id: number;
}
