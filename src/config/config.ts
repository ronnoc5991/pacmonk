export type GameConfig = {
  pelletSize: number;
  powerPelletSize: number;
  character: {
    size: number;
    stepSize: number;
    baseVelocity: number;
  };
}

export const config: GameConfig = {
  pelletSize: 0.4,
  powerPelletSize: 0.7,
  character: {
    size: 1.8,
    stepSize: 0.1,
    baseVelocity: 0.1,
  },
};
