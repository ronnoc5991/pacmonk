import type { Position } from "../types/Position";
import { CollidableObject } from "./CollidableObject";

export class Teleporter extends CollidableObject {
  teleportTo: Position;

  constructor(position: Position, size: number, teleportTo: Position) {
    super(position, size);
    this.teleportTo = teleportTo;
  }
}
