import Grid from '../../../src/engine/grid/Grid';
import Coordinates from '../../../src/engine/grid/Coordinates';
import Path from '../../../src/engine/grid/Path';

describe('testing basic 5x5 grid pathfinding', () => {
  const g = new Grid(5, 5);

  test('zero hop routes', () => {
    const paths = g.getPaths(new Coordinates(0, 0), 0);
    expect(paths).toStrictEqual([]);
  });

  test('one hop routes on the corners and center', () => {
    // Top Left Corner
    let paths = g.getPaths(new Coordinates(0, 0), 1);
    expect(paths).toStrictEqual([
      Path.FromMatrix(1, [
        [0, 0],
        [0, 1],
      ]),
      Path.FromMatrix(1, [
        [0, 0],
        [1, 0],
      ]),
    ]);
    // Top Right Corner
    paths = g.getPaths(new Coordinates(0, 4), 1);
    expect(paths).toStrictEqual([
      Path.FromMatrix(1, [
        [0, 4],
        [0, 3],
      ]),
      Path.FromMatrix(1, [
        [0, 4],
        [1, 4],
      ]),
    ]);
    // Bottom Left Corner
    paths = g.getPaths(new Coordinates(4, 0), 1);
    expect(paths).toStrictEqual([
      Path.FromMatrix(1, [
        [4, 0],
        [4, 1],
      ]),
      Path.FromMatrix(1, [
        [4, 0],
        [3, 0],
      ]),
    ]);
    // Bottom Right Corner
    paths = g.getPaths(new Coordinates(4, 4), 1);
    expect(paths).toStrictEqual([
      Path.FromMatrix(1, [
        [4, 4],
        [4, 3],
      ]),
      Path.FromMatrix(1, [
        [4, 4],
        [3, 4],
      ]),
    ]);
    // Middle
    paths = g.getPaths(new Coordinates(3, 3), 1);
    expect(paths).toStrictEqual([
      Path.FromMatrix(1, [
        [3, 3],
        [3, 2],
      ]),
      Path.FromMatrix(1, [
        [3, 3],
        [3, 4],
      ]),
      Path.FromMatrix(1, [
        [3, 3],
        [2, 3],
      ]),
      Path.FromMatrix(1, [
        [3, 3],
        [4, 3],
      ]),
    ]);
  });

  test('two hop routes', () => {
    // Two Hop Paths from the top left corner
    let paths = g.getPaths(new Coordinates(0, 0), 2);
    expect(paths).toStrictEqual([
      Path.FromMatrix(1, [
        [0, 0],
        [0, 1],
      ]),
      Path.FromMatrix(2, [
        [0, 0],
        [0, 1],
        [0, 2],
      ]),
      Path.FromMatrix(2, [
        [0, 0],
        [0, 1],
        [1, 1],
      ]),
      Path.FromMatrix(1, [
        [0, 0],
        [1, 0],
      ]),
      Path.FromMatrix(2, [
        [0, 0],
        [1, 0],
        [2, 0],
      ]),
      // Note here the route [0,0] -> [1,0] -> [1,1] is omitted
      //   this is because an equal length route to [1,1] had already
      //   been discovered by the time the second route was found.
    ]);

    // Two Hop Paths from near the center
    // <3,3> is intentionally off center since at this size,
    //   it can discover an edge route that is correct but shorter than the range
    paths = g.getPaths(new Coordinates(3, 3), 2);
    // console.log(
    //   paths
    //     .map(p => p.toString())
    //     .join('\n')
    // );
    expect(paths).toStrictEqual([
      Path.FromMatrix(2, [
        [3, 3],
        [3, 2],
        [3, 1],
      ]),
      Path.FromMatrix(2, [
        [3, 3],
        [3, 2],
        [2, 2],
      ]),
      Path.FromMatrix(2, [
        [3, 3],
        [3, 2],
        [4, 2],
      ]),
      Path.FromMatrix(1, [
        [3, 3],
        [3, 4],
      ]),
      Path.FromMatrix(2, [
        [3, 3],
        [3, 4],
        [2, 4],
      ]),
      Path.FromMatrix(2, [
        [3, 3],
        [3, 4],
        [4, 4],
      ]),
      Path.FromMatrix(2, [
        [3, 3],
        [2, 3],
        [1, 3],
      ]),
      Path.FromMatrix(1, [
        [3, 3],
        [4, 3],
      ]),
    ]);
  });
});
