import {SparseGridLayer} from '../../../src/engine/grid/GridLayer';
import Coordinates from '../../../src/engine/grid/Coordinates';
import Size from '../../../src/engine/grid/Size';
import Positionable, {
  TestPositionableElement,
} from '../../../src/engine/grid/Positionable';

describe('testing the SparseGridLayer basic functionality', () => {
  test('1x1 construct with items and get them', () => {
    const items: Positionable[] = [
      new TestPositionableElement('00', new Coordinates(0, 0), new Size(1, 1)),
      new TestPositionableElement('34', new Coordinates(3, 4), new Size(1, 1)),
      new TestPositionableElement('43', new Coordinates(4, 3), new Size(1, 1)),
    ];
    const l = new SparseGridLayer(items);
    expect(l.getElementsAtPosition(new Coordinates(0, 0))).toStrictEqual([
      items[0],
    ]);
    expect(l.getElementsAtPosition(new Coordinates(3, 4))).toStrictEqual([
      items[1],
    ]);
    expect(l.getElementsAtPosition(new Coordinates(4, 3))).toStrictEqual([
      items[2],
    ]);
    expect(l.getElementsAtPosition(new Coordinates(5, 5))).toStrictEqual([]);
  });

  test('1x1 add items and get them', () => {
    const items: Positionable[] = [
      new TestPositionableElement('00', new Coordinates(0, 0), new Size(1, 1)),
      new TestPositionableElement('34', new Coordinates(3, 4), new Size(1, 1)),
      new TestPositionableElement('43', new Coordinates(4, 3), new Size(1, 1)),
    ];
    const l = new SparseGridLayer(items);

    const newItemStacked = new TestPositionableElement(
      'new',
      new Coordinates(0, 0),
      new Size(1, 1)
    );
    l.addItem(newItemStacked);

    const newItemNewCell = new TestPositionableElement(
      'new1',
      new Coordinates(3, 3),
      new Size(1, 1)
    );
    l.addItem(newItemNewCell);

    expect(l.getElementsAtPosition(new Coordinates(0, 0))).toStrictEqual([
      items[0],
      newItemStacked,
    ]);
    expect(l.getElementsAtPosition(new Coordinates(3, 4))).toStrictEqual([
      items[1],
    ]);
    expect(l.getElementsAtPosition(new Coordinates(4, 3))).toStrictEqual([
      items[2],
    ]);
    expect(l.getElementsAtPosition(new Coordinates(3, 3))).toStrictEqual([
      newItemNewCell,
    ]);
    expect(l.getElementsAtPosition(new Coordinates(5, 5))).toStrictEqual([]);
  });


  // TODO: write tests for larger than 1x1 items
});
