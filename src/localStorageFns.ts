import { Player } from "./models/Player";

// export function setActiveGameInLS(game:GAME){}
// export function getActiveGameFromLS():GAME{}

export function setPlayerListInLS(playerList: Player[]) {
  localStorage.setItem("playerList", JSON.stringify(playerList));
}
export function getPlayerListFromLS(): Player[] {
  let playerList: Player[] = [];

  const storedPlayerList = localStorage.getItem("playerList") as string;

  if (localStorage.getItem("playerList") === null) {
    console.log("You don't have any scores nor players saved");
  } else {
    const parsedData = JSON.parse(storedPlayerList) as Player[];
    playerList = parsedData.map((getPlayer) => {
      return new Player(getPlayer.username, getPlayer.wonGames);
    });
  }
  if (playerList.length === 0) {
    console.log("You don't have any scores nor players saved");
  }

  return playerList;
}
