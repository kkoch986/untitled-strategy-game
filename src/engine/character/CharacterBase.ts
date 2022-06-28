import Positionable from '../grid/Positionable';
import Coordinates from '../grid/Coordinates';
import Size from '../grid/Size';

/**
 * CharacterBase provides a base class for a character
 */
export default class CharacterBase implements Positionable {
  position: Coordinates;
  size: Size;

  constructor(p: Coordinates, s: Size) {
    this.position = p;
    this.size = s;
  }

  getPosition(): Coordinates {
    return this.position;
  }

  getSize(): Size {
    return this.size;
  }
}
