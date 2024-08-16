import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [PokemonModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
