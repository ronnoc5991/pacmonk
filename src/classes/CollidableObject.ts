import type { Hitbox } from "../types/Hitbox";
import type { Position } from "../types/Position";

export class CollidableObject {
  position: Position;
  hitbox: Hitbox;
  size: number;

  constructor({ x, y }: Position, size: number) {
    this.position = { x, y };
    this.size = size;
    this.hitbox = {
      top: y - size / 2,
      bottom: y + size / 2,
      left: x - size / 2,
      right: x + size / 2,
    };
  }
}
