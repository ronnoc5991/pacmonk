import { Game } from "./classes/Game";
import { config } from "./config/config";

// TODO: Create a cheat code mode, 'websites' unlocks monk mode and characters are monk vs ninjas

// TODO: create multiple config objects for multiple games
// ie: PacMan, Ms Pacman, etc

const game = new Game(config);

game.initialize();
