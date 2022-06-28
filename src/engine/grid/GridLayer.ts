import Positionable from './Positionable';
import Coordinates from './Coordinates';

/**
 * GridLayer provides a collection of positional elements
 */
export default interface GridLayer {
  getElementsAtPosition(p: Coordinates): Positionable[];
}

/**
 * SparseGridLayer stores a list of items and their positions
 *  it is ideal when there is a large grid and only a few items
 */
export class SparseGridLayer implements GridLayer {
  private items: Map<string, Positionable[]>;

  constructor(items?: Positionable[]) {
    this.items = new Map<string, Positionable[]>();
    if (items !== undefined) {
      items.forEach(v => {
        this.addItem(v);
      });
    }
  }

  private keyForCoordinates(p: Coordinates): string {
    return `${p.row},${p.col}`;
  }

  addItem(p: Positionable) {
    const l = p.getPosition();
    const items = this.getElementsAtPosition(l);
    items.push(p);
    this.items.set(this.keyForCoordinates(l), items);

    // TODO: add this item to all of the spaces that it intersects
    // if its size is greater than 1x1
  }

  // TODO: implement some kind of removeItem

  getElementsAtPosition(p: Coordinates): Positionable[] {
    const i = this.items.get(this.keyForCoordinates(p));
    if (i !== undefined) {
      return i;
    }
    return [];
  }
}
