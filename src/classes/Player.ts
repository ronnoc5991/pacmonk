import { Character } from "./Character";
import type { Direction } from "../types/Direction";
import type { Position } from "../types/Position";
import { getHitboxForPosition } from "../utils/getHitboxForPosition";
import type { CollidableObject } from "./CollidableObject";
import type { Monster } from "./Monster";

export class Player extends Character {
  nextDirection: Direction;

  constructor(size: number, stepSize: number, baseVelocity: number) {
    super(
      { x: 0, y: 0 },
      size,
      stepSize,
      baseVelocity,
      "left",
      (characterAtNextPosition: CollidableObject) => false
    );
    this.nextDirection = "left";
  }

  public killMonster(monster: Monster) {
    monster.die();
  }

  private isNextDirectionPossible() {
    return this.isPositionAvailable({
      position: this.getNextPosition(this.nextDirection),
      hitbox: getHitboxForPosition(
        this.getNextPosition(this.nextDirection),
        this.size
      ),
      size: this.size,
    });
  }

  public updatePosition(velocityMultiplier: number) {
    if (this.direction !== this.nextDirection && this.isNextDirectionPossible())
      this.setDirection(this.nextDirection);
    if (
      this.isPositionAvailable({
        position: this.getNextPosition(),
        hitbox: getHitboxForPosition(this.getNextPosition(), this.size),
        size: this.size,
      })
    )
      this.takeNextStep(velocityMultiplier); // TODO: Incorporate velocity multiplier here
  }

  public initialize(
    initialPosition: Position,
    isPositionAvailable: (characterAtNextPosition: CollidableObject) => boolean
  ) {
    this.setIsPositionAvailable(isPositionAvailable);
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.nextDirection = "up";
          break;
        case "ArrowRight":
          this.nextDirection = "right";
          break;
        case "ArrowDown":
          this.nextDirection = "down";
          break;
        case "ArrowLeft":
          this.nextDirection = "left";
          break;
        default:
          // do nothing
          break;
      }
    });
  }

  public dispose() {
    // To be called on game over?
    window.removeEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.nextDirection = "up";
          break;
        case "ArrowRight":
          this.nextDirection = "right";
          break;
        case "ArrowDown":
          this.nextDirection = "down";
          break;
        case "ArrowLeft":
          this.nextDirection = "left";
          break;
        default:
          // do nothing
          break;
      }
    });
  }
}
