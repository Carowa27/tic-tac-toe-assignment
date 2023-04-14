<script setup lang="ts">
// The full game with all the squares
import { ref } from "vue";
import GameSquare from "./GameSquare.vue";
import StartScreen from "./StartScreen.vue";
import WinnerModal from "./WinnerModal.vue";
import { gameSquareList } from "../squareList";
import { Clicker, Square } from "../models/Square";
import { Player } from "../models/Player";

interface IPlayersProps {
  players: Player[];
}
defineProps<IPlayersProps>();
let startScr = ref(false);
let gameScr = ref(true);

function goToStartScr() {
  startScr.value = true;
  gameScr.value = false;
}

let board = ref<Square[]>(gameSquareList);
let player1 = ref(true);

let highscore = ref(false);
function showHighscore() {
  highscore.value = !highscore.value;
  console.log(highscore);
}

function handleToggle(/*event: Event*/ i: number) {
  let clickedSquare: HTMLDivElement = document.getElementById(
    i.toString()
  ) as HTMLDivElement;
  console.log(i);
  board.value[i].clicked = true;
  if (board.value[i].clicked === true) {
    if (player1.value === true) {
      console.log("in double if");
      board.value[i].clickedBy = Clicker.Player1;
      clickedSquare.classList.add("clicked-by-p-one");
      const addImg = document.createElement("img");
      addImg.src =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png";
      addImg.alt = "gengar";
      addImg.id = "gengar";
      clickedSquare.appendChild(addImg);
    } else {
      board.value[i].clickedBy = Clicker.Player2;
      clickedSquare.classList.add("clicked-by-p-two");
      const addImg = document.createElement("img");
      addImg.src =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png";
      addImg.alt = "squirtle";
      addImg.id = "squirtle";
      clickedSquare.appendChild(addImg);
    }
    player1.value = !player1.value;
  }
  console.log(board.value);
  console.log(clickedSquare.classList.contains("clicked-by-p-one"));
}
function resetGame() {
  console.log("reset btn clicked");
  for (let i = 0; i < board.value.length; i++) {
    let clickedSquare = document.getElementById(i.toString()) as HTMLDivElement;
    clickedSquare.classList.remove("clicked-by-p-one");
    clickedSquare.classList.remove("clicked-by-p-two");
    clickedSquare.innerText = "";

    player1.value = true;
    board.value[i].clicked = false;
    board.value[i].clickedBy = Clicker.None;
  }
}
let gotWinner = ref(false);
function startGameFn() {
  const rowOnePOne =
    board.value[0].clickedBy === Clicker.Player1 &&
    board.value[1].clickedBy === Clicker.Player1 &&
    board.value[2].clickedBy === Clicker.Player1;
  const rowTwoPOne =
    board.value[3].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[5].clickedBy === Clicker.Player1;
  const rowThreePOne =
    board.value[6].clickedBy === Clicker.Player1 &&
    board.value[7].clickedBy === Clicker.Player1 &&
    board.value[8].clickedBy === Clicker.Player1;
  const columnOnePOne =
    board.value[0].clickedBy === Clicker.Player1 &&
    board.value[3].clickedBy === Clicker.Player1 &&
    board.value[6].clickedBy === Clicker.Player1;
  const columnTwoPOne =
    board.value[1].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[7].clickedBy === Clicker.Player1;
  const columnThreePOne =
    board.value[2].clickedBy === Clicker.Player1 &&
    board.value[5].clickedBy === Clicker.Player1 &&
    board.value[8].clickedBy === Clicker.Player1;
  const slashPOne =
    board.value[0].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[8].clickedBy === Clicker.Player1;
  const backSlashPOne =
    board.value[2].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[6].clickedBy === Clicker.Player1;
  const rowOnePTwo =
    board.value[0].clickedBy === Clicker.Player2 &&
    board.value[1].clickedBy === Clicker.Player2 &&
    board.value[2].clickedBy === Clicker.Player2;
  const rowTwoPTwo =
    board.value[3].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[5].clickedBy === Clicker.Player2;
  const rowThreePTwo =
    board.value[6].clickedBy === Clicker.Player2 &&
    board.value[7].clickedBy === Clicker.Player2 &&
    board.value[8].clickedBy === Clicker.Player2;
  const columnOnePTwo =
    board.value[0].clickedBy === Clicker.Player2 &&
    board.value[3].clickedBy === Clicker.Player2 &&
    board.value[6].clickedBy === Clicker.Player2;
  const columnTwoPTwo =
    board.value[1].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[7].clickedBy === Clicker.Player2;
  const columnThreePTwo =
    board.value[2].clickedBy === Clicker.Player2 &&
    board.value[5].clickedBy === Clicker.Player2 &&
    board.value[8].clickedBy === Clicker.Player2;
  const slashPTwo =
    board.value[0].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[8].clickedBy === Clicker.Player2;
  const backSlashPTwo =
    board.value[2].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[6].clickedBy === Clicker.Player2;
  if (
    rowOnePOne ||
    rowTwoPOne ||
    rowThreePOne ||
    columnOnePOne ||
    columnTwoPOne ||
    columnThreePOne ||
    slashPOne ||
    backSlashPOne
  ) {
    console.log("Congratulations,player1!");
    gotWinner.value = true;
  }
  if (
    rowOnePTwo ||
    rowTwoPTwo ||
    rowThreePTwo ||
    columnOnePTwo ||
    columnTwoPTwo ||
    columnThreePTwo ||
    slashPTwo ||
    backSlashPTwo
  ) {
    console.log("Congratulations,player2!");
    gotWinner.value = true;
  }
  //add a "No win this time" when all is clicked but no one won
}
</script>
<template>
  <section class="game-wrapper" v-if="gameScr">
    <div class="turn-teller">
      <span v-if="player1 === true">{{ players[0].username }}</span
      ><span v-if="player1 === false">{{ players[1].username }}</span
      >´s turn
    </div>
    <section class="game-mat">
      <div class="board-wrapper">
        <GameSquare
          :square="square"
          v-for="(square, id) in board"
          :id="id"
          @toggle-clicked="() => (handleToggle(id), startGameFn())"
          :key="id"
          class="clicked-by-none"
        />
      </div>
      <div class="player-wrapper">
        <b> <span>username</span><span>wins</span> </b>
        <p class="player-stat">
          <span>{{ players[0].username }}</span>
        </p>
        <p class="player-stat">
          <span>{{ players[1].username }}</span>
        </p>
      </div>
    </section>
    <button id="reset-btn" @click="() => resetGame()">Reset Game</button>
    <div class="score-wrapper">
      <button @click="() => showHighscore()">Show scores</button>
      <section v-if="highscore">Highscores will show</section>
    </div>
    <button id="back-btn" @click="() => goToStartScr()">Back to Start</button>
  </section>
  <StartScreen v-if="startScr" />
  <WinnerModal v-if="gotWinner" />
</template>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid greenyellow;
}
.game-mat {
  border: 2px solid lightblue;
  display: flex;
}
.turn-teller {
  padding: 1rem;
}
.board-wrapper {
  height: 15.2rem;
  width: 15.25rem;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid black;
  gap: 0;
}
.player-wrapper {
  border: 2px solid violet;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 10rem;
}
.player-stat {
  margin: 0;
  padding-top: 0.3rem;
  border-bottom: 1px solid rgb(95, 95, 95);
}
.clicked-by-none {
  background-color: rgba(135, 135, 135, 0.473);
}
.clicked-by-p-one {
  background-color: rgba(85, 49, 113, 0.473);
}
.clicked-by-p-two {
  background-color: rgba(49, 91, 113, 0.473);
}
.score-wrapper {
  margin-top: 2rem;
}
#gengar,
#squirtle {
  max-width: 100%;
}
#reset-btn,
#back-btn {
  margin-top: 1rem;
}
</style>
