import Coordinates from './Coordinates';
import Size from './Size';

/**
 * Positionable provides an interface for any item that can be placed on the grid
 */
export default interface Positionable {
  getPosition(): Coordinates;
  getSize(): Size;
  getCollisionType(): CollisionType;
}

export interface ImpedingTile {
  getMovementPenalty(): number;
}

export enum CollisionType {
  // NO_COLLISION means this item has no bearing on the ability
  //   of a character to move through it
  NO_COLLISION = 1,

  // IMPASSABLE means this item cannot be traversed no matter what
  IMPASSABLE,

  // IMPEDENCE means the item slows the character down. Things of this type
  //   must also implement the ImpedingTile interface
  IMPEDENCE,
}

export class TestPositionableElement implements Positionable, ImpedingTile {
  private name: string;
  private c: Coordinates;
  private s: Size;
  private ct: CollisionType;
  private mp: number;

  constructor(
    name: string,
    c: Coordinates,
    s: Size,
    ct: CollisionType = CollisionType.NO_COLLISION,
    mp = 0
  ) {
    this.name = name;
    this.c = c;
    this.s = s;
    this.ct = ct;
    this.mp = mp;
  }

  getPosition(): Coordinates {
    return this.c;
  }
  getSize(): Size {
    return this.s;
  }
  getCollisionType(): CollisionType {
    return this.ct;
  }
  getMovementPenalty(): number {
    return this.mp;
  }
}
