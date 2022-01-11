import { addFloatingPointNumbers } from "../utils/addFloatingPointNumbers";
import type { Position } from "../types/Position";
import type { Hitbox } from "../types/Hitbox";

export function getHitboxForPosition({ x, y }: Position, size: number): Hitbox {
  const halfSize = size / 2;
  return {
    top: addFloatingPointNumbers(y, -halfSize),
    bottom: addFloatingPointNumbers(y, halfSize),
    left: addFloatingPointNumbers(x, -halfSize),
    right: addFloatingPointNumbers(x, halfSize),
  };
}
