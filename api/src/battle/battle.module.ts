import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battle } from './battle.entity';
import { Pokemon } from 'src/pokemon/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle, Pokemon])],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
