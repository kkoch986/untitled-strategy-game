/**
 * Walkable provides an interface for things that can walk around on the grid
 */
export default interface Walkable {
  getWalkingRange(): number;
  getRunningRange(): number;
}
