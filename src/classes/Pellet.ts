import type { Position } from "../types/Position";
import { CollidableObject } from "./CollidableObject";

export class Pellet extends CollidableObject {
  hasBeenEaten: boolean;
  isPowerPellet: boolean;

  constructor(
    position: Position,
    size: number,
    isPowerPellet: boolean = false
  ) {
    super(position, size);
    this.hasBeenEaten = false;
    this.isPowerPellet = isPowerPellet;
  }
}
