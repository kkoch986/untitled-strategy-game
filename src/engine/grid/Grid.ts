import GridLayer from './GridLayer';
import Coordinates from './Coordinates';
import Path from './Path';

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

  // getPaths returns a list of all possible paths from the given coordinate that
  //   can be reached in up to and including the given range.
  // distance is calculated in cartesian moves only (no diagonal moves)
  getPaths(s: Coordinates, range: number): Path[] {
    // The general approach here will be to keep a list of all paths we have found
    // with _exactly_ `range` length (unless we cannot complete a path that long).
    // As we do so, keep track of the shortest path we have discovered to each point.
    // While traversing, if you encounter a cell we have already visited, only search
    // from there if it results in a shorter path.
    // If we reach `range` or there are no more options to move, store that path.
    const minimumCosts: number[][] = [];
    const traverse = (here: Coordinates, basePath: Path): Path[] => {
      if (!this.isInBounds(here)) {
        return [];
      }

      // TODO: allow tiles to have variable costs
      const costOfLeavingHere = 1;

      // Add this move to the minimumCosts
      if (!minimumCosts[here.row]) {
        minimumCosts[here.row] = [];
      }
      const minCost = minimumCosts[here.row][here.col];
      if (minCost === undefined || basePath.cost < minCost) {
        minimumCosts[here.row][here.col] = basePath.cost;
      }
      // TODO: handle things that are bigger than 1x1
      // TODO: handle moving around terrain objects
      // TODO: handle jumping over things?
      if (basePath.cost === range) {
        return [basePath.withNextHop(here, 0)];
      }

      let hasOutOfBoundsCandidate = false;
      const candidates = [
        here.left(),
        here.right(),
        here.up(),
        here.down(),
      ].filter(c => {
        // When deciding if we should traverse here:
        //  1. check if its in bounds
        if (!this.isInBounds(c)) {
          hasOutOfBoundsCandidate = true;
          return false;
        }

        //  2. check if we have traversed it already,
        //     if so, only proceed if the incremental cost of moving to that space
        //     is lower than the previously encountered cost
        if (!minimumCosts[c.row]) {
          minimumCosts[c.row] = [];
        }
        const minCost = minimumCosts[c.row][c.col];
        if (
          minCost === undefined ||
          minCost > basePath.cost + costOfLeavingHere
        ) {
          return true;
        }
        return false;
      });

      // If there are no eligible candidates, just return this space.
      if (candidates.length === 0) {
        return [basePath.withNextHop(here, 0)];
      }
      const ret: Path[] = [];
      // if any move goes specifically out of bounds, we should make sure to include
      //        the move to this space as a final move
      if (hasOutOfBoundsCandidate) {
        ret.push(basePath.withNextHop(here, 0));
      }
      return ret.concat(
        ...candidates.map(c =>
          traverse(c, basePath.withNextHop(here, costOfLeavingHere))
        )
      );
    };

    return traverse(s, new Path()).filter(c => c.cost > 0);
  }

  isInBounds(c: Coordinates): boolean {
    return (
      c.row >= 0 && c.col >= 0 && c.row < this.height && c.col < this.width
    );
  }
}
