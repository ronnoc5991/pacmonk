import { useAnimationFrame } from "../utils/useAnimationFrame";
import { useTimeout } from "../utils/useTimeout";
import { getMazeFromTemplate } from "../utils/getMazeFromTemplate";
import getRoundVelocityMultipliers from '../utils/getRoundVelocityMultipliers';
import type { GameMode } from "../types/GameMode";
import type { GameEvent } from "../types/GameEvent";
import type { MazeTemplate } from "../types/MazeTemplate";
import type { MonsterConfig } from "../config/monster";
import type { CollidableObject } from "./CollidableObject";
import type { Character } from "./Character";
import type { Direction } from "../types/Direction";
import { Player } from "./Player";
import { Monster } from "./Monster";
import { Round } from './Round';
import { CanvasRenderer } from "./CanvasRenderer";
import { CollisionDetector } from "./CollisionDetector";
import type { GameConfig } from "../config/config";
import type { DefiniteModeTiming, IndefiniteModeTiming } from '@/config/modeTiming';
import getRoundModeTimings from '@/utils/getRoundModeTimings';

export class Game {
  round: Round;
  collisionDetector: CollisionDetector;
  renderer: CanvasRenderer;
  player: Player;
  monsters: Array<Monster>;
  score: number;
  roundNumber: number;
  livesCount: number;

  // roundConfigs: Array<RoundConfig> TODO: Game should have an array of these configs and create new rounds by accessing it at the roundNumber index

  mazeTemplates: Array<MazeTemplate>;
  roundStage: number = 0; // TODO: This feels round specific?
  currentStageTiming: DefiniteModeTiming | IndefiniteModeTiming | null = null;
  scatterAndChaseTimer: { pause: () => void; resume: () => void } | null = null;
  fleeTimeout: null | ReturnType<typeof setTimeout> = setTimeout(() => {});
  mode: GameMode | null = null;

  constructor( // TODO: Game should only take a single config object as arguments
    config: GameConfig,
    mazeTemplates: Array<MazeTemplate>,
    monsterConfig: MonsterConfig
  ) {
    this.mazeTemplates = mazeTemplates;
    this.score = 0;
    this.roundNumber = 0; // TODO: This should be called roundIndex
    this.livesCount = 3;
    const {
      barriers,
      initialCharacterPositions,
      slowZoneCells,
      noUpCells,
      dimensions,
      pellets,
      teleporters,
      monsterTargets,
    } = getMazeFromTemplate(mazeTemplates[this.roundNumber]);
    this.round = new Round({
      barriers: barriers.collidable,
      noUpCells,
      slowZoneCells,
      pellets,
      monsterTargets,
      initialCharacterPositions,
      teleporters,
      velocityMultipliers: getRoundVelocityMultipliers(this.roundNumber),
      modeTimings: getRoundModeTimings(this.roundNumber)
    });
    this.renderer = new CanvasRenderer(dimensions, barriers.renderable);
    this.collisionDetector = new CollisionDetector();
    this.player = new Player(
      config.character.size,
      config.character.stepSize,
      config.character.baseVelocity
    );
    this.monsters = Object.entries(monsterConfig)
      .filter((character, index) => index === 0)
      .map(
        ([key, value]) =>
          new Monster(
            value.name,
            config.character.size,
            config.character.stepSize,
            config.character.baseVelocity,
            {
              exit: monsterTargets.exit.position,
              revive: monsterTargets.revive.position,
              scatter: monsterTargets.scatter[value.name],
            },
            this.mode || "pursue"
          )
      );
  }

  private getVelocityMultiplier(character: Character, isMonster: boolean) {
    // if it is a monster that is alive and has not recently been revived, and it is flee mode, we need to impose a speed limit
    // if is Monsters, check if in slowZone
    // from this function, call other functions and determine what velocity multiplier takes precedent
    // could maybe return a value from the supporting functions (1 or the limiting number)
    if (isMonster) {
      const currentMonster = character as Monster;
      return Math.min(
        this.round.getVelocityMultipliers().monster[
          this.isMonsterInTunnel(currentMonster) ? "tunnel" : "default"
        ],
        this.round.getVelocityMultipliers().monster[
          this.mode === "flee" && currentMonster.isAlive ? "flee" : "default"
        ]
      );
    } else {
      return this.round.getVelocityMultipliers().player.default;
    }
  }

  private isMonsterInTunnel(monster: Monster) {
    return this.round.getSlowZoneCells().some((slowZoneCell) => this.collisionDetector.areObjectsColliding(monster, slowZoneCell, 'sameCell'));
  }

  private getMonsterForbiddenDirections(monster: Monster): Array<Direction> {
    const forbiddenDirections: Array<Direction> = [];
    if (
      -1 !==
      this.round.getNoUpCells().findIndex((noUpCell) => {
        return this.collisionDetector.areObjectsColliding(
          noUpCell,
          monster,
          "sameCell"
        );
      })
    )
      forbiddenDirections.push("up");
    return forbiddenDirections;
  }

  // TODO: Give each round a different border color?  This way we know that they are different rounds?

  private setMode(newMode: GameMode) {
    this.mode = newMode;
  }

  private incrementRoundStage() {
    if (this.round.getModeTimings()[this.roundStage + 1])
      this.roundStage++;
  }

  private updateCurrentStage() {
    this.currentStageTiming = this.round.getModeTimings()[this.roundStage];
  }

  private updateMode(newMode: GameMode) {
    this.setMode(newMode);
    this.monsters.forEach((monster) => monster.onModeChange(newMode));
  }

  private startNextRoundStage() {
    this.updateCurrentStage();
    if (this.currentStageTiming) this.updateMode(this.currentStageTiming.mode);
    console.log(this.mode);
    if (this.currentStageTiming && "duration" in this.currentStageTiming) {
      this.scatterAndChaseTimer = useTimeout(() => {
        this.incrementRoundStage();
        this.startNextRoundStage();
      }, this.currentStageTiming.duration * 1000);
    }
  }

  private startFleeTimeout() {
    if (this.scatterAndChaseTimer) this.scatterAndChaseTimer.pause();
    if (this.fleeTimeout) clearTimeout(this.fleeTimeout);
    this.updateMode("flee");
    this.fleeTimeout = setTimeout(() => {
      if (this.scatterAndChaseTimer) this.scatterAndChaseTimer.resume();
      if (this.currentStageTiming)
        this.updateMode(this.currentStageTiming.mode);
    }, 5000);
  }

  private increaseScore(scoreIncrease: number) {
    this.score += scoreIncrease;
  }

  private onEvent(event: GameEvent) {
    switch (event) {
      case "pelletEaten":
        this.increaseScore(10);
        break;
      case "powerPelletEaten":
        this.increaseScore(50);
        this.startFleeTimeout();
        break;
      case "monsterEaten":
        this.increaseScore(100);
        break;
      case "playerEaten":
        this.livesCount -= 1;
        this.resetCharacterPositions();
        break;
      case "allPelletsEaten":
        console.log("round over");
        this.incrementRoundNumber();
        break;
      default:
        // do nothing
        break;
    }
  }

  private isGameOver() {
    return this.livesCount === 0;
  }

  private incrementRoundNumber() {
    this.roundNumber += 1;
  }

  private isRoundOver() {
    return this.round.getPellets().every((pellet) => pellet.hasBeenEaten);
  }

  private updateCharacterPositions() {
    this.player.updatePosition(this.getVelocityMultiplier(this.player, false));

    this.monsters.forEach((monster) => {
      monster.updatePosition(
        this.getVelocityMultiplier(monster, true),
        this.getMonsterForbiddenDirections(monster)
      );
    });
  }

  private resetCharacterPositions() {
    this.player.setPositionAndUpdateHitbox(
      this.round.getInitialCharacterPositions().player
    );
    this.monsters.forEach((monster) => {
      monster.reset(this.round.getInitialCharacterPositions().monsters[monster.name]);
    });
  }

  private checkForCollisionsWithTeleporters() {
    [this.player, ...this.monsters].forEach((character) => {
      const collidingTeleporter = this.round.getTeleporters().find((teleporter) => {
        return this.collisionDetector.areObjectsColliding(
          teleporter,
          character,
          "center"
        );
      });
      if (collidingTeleporter) {
        character.setPositionAndUpdateHitbox(collidingTeleporter.teleportTo);
      }
    });
  }

  private checkForCharacterCollisions() {
    this.monsters
      .filter((monster) => monster.isAlive)
      .forEach((monster) => {
        if (
          this.collisionDetector.areObjectsColliding(
            this.player,
            monster,
            "sameCell"
          )
        ) {
          if (this.mode === "flee") {
            this.player.killMonster(monster);
            this.onEvent("monsterEaten");
          } else {
            this.onEvent("playerEaten");
          }
        }
      });
  }

  private checkForMonsterTargetCollisions() {
    this.monsters.forEach((monster) => {
      if (
        this.collisionDetector.areObjectsColliding(
          monster,
          this.round.getMonsterTargets().revive,
          "center"
        )
      ) {
        monster.onTargetCollision("revive");
      }
      if (
        this.collisionDetector.areObjectsColliding(
          monster,
          this.round.getMonsterTargets().exit,
          "center"
        )
      ) {
        monster.onTargetCollision("exit");
      }
    });
  }

  private checkForCharacterPelletCollisions() {
    this.round.getPellets()
      .filter((pellet) => !pellet.hasBeenEaten)
      .forEach((pellet) => {
        if (
          this.collisionDetector.areObjectsColliding(
            this.player,
            pellet,
            "sameCell"
          )
        ) {
          pellet.hasBeenEaten = true;
          if (pellet.isPowerPellet) this.onEvent("powerPelletEaten");
          else this.onEvent("pelletEaten");
        }
      });
  }

  private isPositionAvailable(characterAtNextPosition: CollidableObject) {
    return this.round.getBarriers().every((barrier) => {
      return !this.collisionDetector.areObjectsColliding(
        barrier,
        characterAtNextPosition,
        "edge"
      );
    });
  }

  public initialize() {
    this.startNextRoundStage();
    this.player.initialize(
      this.round.getInitialCharacterPositions().player,
      (characterAtNextPosition: CollidableObject) =>
        this.isPositionAvailable(characterAtNextPosition)
    );
    this.monsters.forEach((monster) =>
      monster.initialize(
        (characterAtNextPosition: CollidableObject) =>
          this.isPositionAvailable(characterAtNextPosition),
        () => this.player.position
      )
    );

    this.resetCharacterPositions();

    useAnimationFrame(() => {
      if (this.isRoundOver()) console.log("round is over");
      if (this.isGameOver()) console.log("game over");
      this.updateCharacterPositions();
      this.checkForCharacterPelletCollisions();
      this.checkForCollisionsWithTeleporters();
      this.checkForMonsterTargetCollisions();
      this.checkForCharacterCollisions();
      this.renderer?.update(
        this.round.getPellets().filter((pellet) => !pellet.hasBeenEaten),
        this.player,
        this.monsters
      );
    });
  }
}
