import Coordinates from './Coordinates';

/**
 * Path provides a list of hops that can be played on the grid
 */
export default class Path {
  hops: Coordinates[];
  cost: number;

  constructor(hops: Coordinates[] = [], cost = 0) {
    this.hops = hops;
    this.cost = cost;
  }

  withNextHop(c: Coordinates, hopCost: number): Path {
    return new Path([...this.hops, c], this.cost + hopCost);
  }

  toString(): string {
    return (
      `Path[l${this.hops.length},c${this.cost}]:` +
      this.hops.map(h => `(${h.row}, ${h.col})`).join(' -> ')
    );
  }

  compare(b: Path): number {
    const aStr = this.toString();
    const bStr = b.toString();
    if (aStr > bStr) {
      return 1;
    } else if (aStr < bStr) {
      return -1;
    }
    return 0;
  }

  /**
   * Construct a path from a matrix of:
   *   [
   *     [x, y],
   *     [x2, y2],
   *     ...
   *   ],
   */
  static FromMatrix(cost: number, m: number[][]): Path {
    const paths = m.map(r => new Coordinates(r[0], r[1]));
    return new Path(paths, cost);
  }
}
