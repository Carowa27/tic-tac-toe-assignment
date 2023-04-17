import { ref } from "vue";
import { Clicker, Square } from "./models/Square";

export function resetGame(
  squares: Square[],
  playerInfo: boolean,
  doWeHaveAWinner: boolean,
  endOfGameWithNoWinner: boolean
) {
  let board = ref<Square[]>(squares);
  let player1 = ref(playerInfo);
  let gotWinner = ref(doWeHaveAWinner);
  let endGame = ref(endOfGameWithNoWinner);
  console.log("reset btn clicked");
  for (let i = 0; i < board.value.length; i++) {
    let clickedSquare = document.getElementById(i.toString()) as HTMLDivElement;
    clickedSquare.classList.remove("clicked-by-p-one");
    clickedSquare.classList.remove("clicked-by-p-two");
    clickedSquare.innerText = "";

    player1.value = true;
    board.value[i].clicked = false;
    board.value[i].clickedBy = Clicker.None;
    gotWinner.value = false;
    endGame.value = false;
  }
  let returnObject = { player1, board, gotWinner, endGame };
  console.log(returnObject.board.value);
  console.log(returnObject.player1.value);
  return returnObject;
}
