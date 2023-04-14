export class Square {
  constructor(
    public id: number,
    public clicked: boolean,
    public clickedBy: Clicker
  ) {}
}

export const enum Clicker {
  None = "none",
  Player1 = "player1",
  Player2 = "player2",
}
