import { Player } from "./Player";
import { Square } from "./Square";

export class InGameSquare {
  constructor(public square: Square, public clickedBy: Player) {}
}
