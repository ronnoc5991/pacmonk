import type { GameMode } from '@/types/GameMode';

export type DefiniteModeTiming = { mode: GameMode; duration: number };
export type IndefiniteModeTiming = { mode: GameMode; };

export type ModeTimings = [DefiniteModeTiming, DefiniteModeTiming, DefiniteModeTiming, DefiniteModeTiming, DefiniteModeTiming, DefiniteModeTiming, DefiniteModeTiming, IndefiniteModeTiming];

export type RoundGroup = 'roundOne' | 'roundsTwoThroughFour' | 'roundsFiveAndUp';

export const modeTimingConfigs: Record<RoundGroup, ModeTimings> = {
  roundOne: [ { mode: 'scatter', duration: 7 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 7 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 5 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 5 }, { mode: 'pursue' } ],
  roundsTwoThroughFour: [ { mode: 'scatter', duration: 7 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 7 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 5 }, { mode: 'pursue', duration: 1033 }, { mode: 'scatter', duration: 1 / 60 }, { mode: 'pursue' } ],
  roundsFiveAndUp: [ { mode: 'scatter', duration: 5 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 5 }, { mode: 'pursue', duration: 20 }, { mode: 'scatter', duration: 5 }, { mode: 'pursue', duration: 1037 }, { mode: 'scatter', duration: 1 / 60 }, { mode: 'pursue' } ],
};
