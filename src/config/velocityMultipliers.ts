type BaseVelocityMultipliers = {
  default: number;
  flee: number;
};

export type VelocityMultipliers = {
  player: BaseVelocityMultipliers;
  monster: BaseVelocityMultipliers & { tunnel: number };
}

export type CharacterVelocityMultiplierConfig = Record<'roundOne' | 'roundsTwoThroughFour' | 'roundsFiveThroughTwenty' | 'roundsTwentyOneAndUp', VelocityMultipliers>;

export const velocityMultiplierConfig: CharacterVelocityMultiplierConfig = {
  roundOne: {
    player: {
      default: 0.8,
      flee: 0.9,
    },
    monster: {
      default: 0.75,
      flee: 0.5,
      tunnel: 0.4,
    }
  },
  roundsTwoThroughFour: {
    player: {
      default: 0.9,
      flee: 0.95,
    },
    monster: {
      default: 0.85,
      flee: 0.55,
      tunnel: 0.45,
    }
  },
  roundsFiveThroughTwenty: {
    player: {
      default: 1,
      flee: 1,
    },
    monster: {
      default: 0.95,
      flee: 0.60,
      tunnel: 0.5,
    }
  },
  roundsTwentyOneAndUp: {
    player: {
      default: 0.9,
      flee: 1,
    },
    monster: {
      default: 0.95,
      flee: 0.60,
      tunnel: 0.5,
    }
  },
}
