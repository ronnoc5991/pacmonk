import { CollidableObject } from "./CollidableObject";
import type { Position } from "../types/Position";

type CellVariant = "tunnel" | "monsterRevive" | "monsterExit" | "noUpwardTurns";

export class Cell extends CollidableObject {
  variant: CellVariant;
  constructor(position: Position, size: number, variant: CellVariant) {
    super(position, size);
    this.variant = variant;
  }
}
