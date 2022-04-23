// TODO: Create all Round maps, parse them, then store that parsed config object
// there is no need to make this parsing part of the game

import type { Barrier } from './Barrier';
import type { Pellet } from './Pellet';
import type { Teleporter } from './Teleporter';
import type { Cell } from './Cell';
import type { InitialPositionConfig, MonsterTargetsConfig } from '../types/Maze';
import type { VelocityMultipliers } from '../config/velocityMultipliers';
import type { ModeTimings } from '@/config/modeTiming';

type RoundConfig = {
  barriers: Array<Barrier>;
  pellets: Array<Pellet>;
  teleporters: Array<Teleporter>
  initialCharacterPositions: InitialPositionConfig;
  monsterTargets: MonsterTargetsConfig;
  slowZoneCells: Array<Cell>;
  noUpCells: Array<Cell>;
  velocityMultipliers: VelocityMultipliers;
  modeTimings: ModeTimings;
};

export class Round {
  config: RoundConfig;

  constructor(
    config: RoundConfig,
  ) {
    this.config = config;
  }

  public getBarriers(): Array<Barrier> {
    return this.config.barriers;
  }

  public getPellets(): Array<Pellet> {
    return this.config.pellets;
  }

  public getTeleporters(): Array<Teleporter> {
    return this.config.teleporters;
  }

  public getInitialCharacterPositions(): InitialPositionConfig {
    return this.config.initialCharacterPositions;
  }

  public getMonsterTargets(): MonsterTargetsConfig {
    return this.config.monsterTargets;
  }

  public getSlowZoneCells(): Array<Cell> {
    return this.config.slowZoneCells;
  }

  public getNoUpCells(): Array<Cell> {
    return this.config.noUpCells;
  }

  public getVelocityMultipliers(): VelocityMultipliers {
    return this.config.velocityMultipliers;
  }

  public getModeTimings(): ModeTimings {
    return this.config.modeTimings;
  }
}
