import GridLayer from './GridLayer';
import Coordinates from './Coordinates';
import Path from './Path';
import Positionable, { CollisionType, ImpedingTile } from './Positionable';

/**
 * Grid provides the basis for managing a map and the things on each tile
 */
export default class Grid {
  height: number;
  width: number;
  layers: GridLayer[];

  constructor(h: number, w: number) {
    this.height = h;
    this.width = w;
    this.layers = [];
  }

  setLayer(z: number, l: GridLayer) {
    this.layers[z] = l;
  }

  getAllElementsAtPosition(c: Coordinates): Positionable[] {
    const ret: Positionable[] = [];
    return ret.concat(...this.layers.map(l => l.getElementsAtPosition(c)));
  }

  // getPaths returns a list of all possible paths from the given coordinate that
  //   can be reached in up to and including the given range.
  // distance is calculated in cartesian moves only (no diagonal moves)
  getPaths(s: Coordinates, range: number): Path[] {
    // The general approach here will be to keep a list of all paths we have found
    // As we do so, keep track of the shortest path we have discovered to each point.
    // While traversing, if you encounter a cell we have already visited, only search
    // from there if it results in a shorter path.
    // If we reach `range` or there are no more options to move, store that path.
    const minimumCosts: number[][] = [];
    const traverse = (basePath: Path): Path[] => {
      const head = basePath.head();

      // If we are out of bounds, just stop
      if (!this.isInBounds(head)) {
        return [];
      }

      // If the cost of the basepath is greater than the range
      //   don't try traversing anymore. this also shoud only happen on invalid inputs
      if (basePath.cost > range) {
        return [];
      }

      // Add this move to the minimumCosts
      if (!minimumCosts[head.row]) {
        minimumCosts[head.row] = [];
      }
      const minCost = minimumCosts[head.row][head.col];
      if (minCost === undefined || basePath.cost < minCost) {
        minimumCosts[head.row][head.col] = basePath.cost;
      }

      // Generate the list of candidate next steps
      const candidates = [head.left(), head.right(), head.up(), head.down()];
      const ret: Path[] = [basePath];
      return ret.concat(
        ...candidates.map(c => {
          // If we are out of bounds, just stop
          if (!this.isInBounds(c)) {
            return [];
          }

          const elementsHere = this.getAllElementsAtPosition(head);
          console.log(elementsHere);

          // check if this cell is completely blocked by a positionable element
          // also compute the total cost to move to this position by summing any
          //   impeding elements
          let fullyBlocked = false;
          let costToGoHere = 1;
          elementsHere.forEach(e => {
            switch (e.getCollisionType()) {
              case CollisionType.NO_COLLISION:
                break;
              case CollisionType.IMPASSABLE:
                fullyBlocked = true;
                return;
              case CollisionType.IMPEDENCE:
                costToGoHere += (e as ImpedingTile).getMovementPenalty();
                return;
            }
          });

          if (fullyBlocked) {
            return [];
          }

          // dont include paths that have already been explored
          if (!minimumCosts[c.row]) {
            minimumCosts[c.row] = [];
          }
          const minCost = minimumCosts[c.row][c.col];
          if (minCost === undefined || basePath.cost + costToGoHere < minCost) {
            return traverse(basePath.withNextHop(c, costToGoHere));
          }
          return [];
        })
      );
    };
    return traverse(new Path([s], 0)).filter(p => {
      // dont return the path with just the starting point on it
      if (p.length() === 1 && p.cost === 0) {
        return false;
      }
      return true;
    });
  }

  isInBounds(c: Coordinates): boolean {
    return (
      c.row >= 0 && c.col >= 0 && c.row < this.height && c.col < this.width
    );
  }
}
