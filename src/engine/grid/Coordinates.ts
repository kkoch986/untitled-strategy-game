/**
 * Coordinate provides an x,y pair
 */
export default class Coordinates {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  right(): Coordinates {
    return new Coordinates(this.row, this.col + 1);
  }
  left(): Coordinates {
    return new Coordinates(this.row, this.col - 1);
  }
  up(): Coordinates {
    return new Coordinates(this.row - 1, this.col);
  }
  down(): Coordinates {
    return new Coordinates(this.row + 1, this.col);
  }
}
