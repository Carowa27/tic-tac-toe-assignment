import { Player } from "./models/Player";

// export function setActiveGameInLS(game:GAME){}
// export function getActiveGameFromLS():GAME{}

export function setPlayerListInLS(list: Player[]) {
  localStorage.setItem("playerList", JSON.stringify(list));
}

export function getPlayerListFromLS(): Player[] {
  let playerList: Player[] = [];

  const storedPlayerList = localStorage.getItem("playerList") as string;

  if (localStorage.getItem("playerList") === null) {
    console.log("You don't have anything saved");
  } else {
    const parsedData = JSON.parse(storedPlayerList) as Player[];
    playerList = parsedData.map((getPlayer) => {
      return new Player(getPlayer.username);
    });
  }
  return playerList;
}
