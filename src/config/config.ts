import type { MonsterConfig } from '@/config/monster';
import { monsterConfig } from '@/config/monster';
import type { MazeTemplate } from '@/types/MazeTemplate';
import { mazeTemplate } from '@/config/mazeTemplate';

export type GameConfig = {
  pelletSize: number;
  powerPelletSize: number;
  character: {
    size: number;
    stepSize: number;
    baseVelocity: number;
  };
  monster: MonsterConfig;
  mazeTemplates: Array<MazeTemplate>;
}

export const config: GameConfig = {
  pelletSize: 0.4,
  powerPelletSize: 0.7,
  character: {
    size: 1.8,
    stepSize: 0.1,
    baseVelocity: 0.1,
  },
  monster: monsterConfig,
  mazeTemplates: [mazeTemplate],
};
