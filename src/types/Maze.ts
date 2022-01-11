import type { Position } from "./Position";
import type { Barrier } from "../classes/Barrier";
import type { RenderableBarrier } from "./RenderableBarrier";
import type { Teleporter } from "../classes/Teleporter";
import type { Pellet } from "../classes/Pellet";
import type { Cell } from "../classes/Cell";

export type InitialPositionConfig = {
  player: Position;
  monsters: {
    blinky: Position;
    clyde: Position;
    inky: Position;
    pinky: Position;
  };
};

export type MonsterTarget = "exit" | "revive" | "scatter" | "player";

export type MonsterTargetPositions = {
  exit: Position;
  revive: Position;
  scatter: Position;
};

export type MonsterTargetsConfig = {
  exit: Cell;
  revive: Cell;
  scatter: {
    inky: Position;
    blinky: Position;
    pinky: Position;
    clyde: Position;
  };
};

export type Maze = {
  barriers: {
    collidable: Array<Barrier>;
    renderable: Array<RenderableBarrier>;
  };
  dimensions: {
    width: number;
    height: number;
  };
  pellets: Array<Pellet>;
  slowZoneCells: Array<Cell>;
  noUpCells: Array<Cell>;
  teleporters: Array<Teleporter>;
  initialCharacterPositions: InitialPositionConfig;
  monsterTargets: MonsterTargetsConfig;
};
