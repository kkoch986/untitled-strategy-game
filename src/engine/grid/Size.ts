/**
 * Size provides the physical dimensions of an object on the grid
 */
export default class Size {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
