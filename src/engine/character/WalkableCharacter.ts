import CharacterBase from './CharacterBase';
import Walkable from '../grid/Walkable';
import Coordinates from '../grid/Coordinates';
import Size from '../grid/Size';

/**
 * WalkableCharacter
 */
export default class WalkableCharacter
  extends CharacterBase
  implements Walkable
{
  speed: number;
  constructor(p: Coordinates, s: Size, sp: number) {
    super(p, s);
    this.speed = sp;
  }

  getWalkingRange(): number {
    return this.speed;
  }

  getRunningRange(): number {
    return this.speed * 2;
  }
}
