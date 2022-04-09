// TODO: Look into what parsing a round array looks like
// Can create a series of round arrays
// Put each round array in an array
// also create an object or function that gets the round config based on round number
// Loop over each array, parse the array, get the round config information, create a round config object
// that object should 'ship' with the game, we do not need to parse this on the browser.  Should already be parsed

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
