import type { VelocityMultipliers } from '../config/velocityMultipliers';
import { velocityMultiplierConfig } from '../config/velocityMultipliers';

export default function getRoundVelocityMultipliers(roundIndex: number): VelocityMultipliers {
  if (roundIndex === 0) return velocityMultiplierConfig.roundOne;
  if (roundIndex >= 1 && roundIndex <= 3) return velocityMultiplierConfig.roundsTwoThroughFour;
  if (roundIndex >= 4 && roundIndex <= 19) return velocityMultiplierConfig.roundsFiveThroughTwenty;
  return velocityMultiplierConfig.roundsTwentyOneAndUp;
}
