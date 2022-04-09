import { modeTimingConfigs, ModeTimings } from '@/config/modeTiming';

export default function getRoundModeTimings(roundIndex: number): ModeTimings {
  if (roundIndex === 0) return modeTimingConfigs.roundOne;
  if (roundIndex >= 1 && roundIndex <= 3) return modeTimingConfigs.roundsTwoThroughFour;
  return modeTimingConfigs.roundsFiveAndUp;
}
