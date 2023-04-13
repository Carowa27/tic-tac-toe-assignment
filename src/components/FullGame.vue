<script setup lang="ts">
// The full game with all the squares
import { ref } from "vue";
import GameSquare from "./GameSquare.vue";
import StartScreen from "./StartScreen.vue";
import { gameSquareList } from "../squareList";
import { Square } from "../models/Square";

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
      board.value[i].clickedBy = "player1";
      clickedSquare.classList.add("clicked-by-p-one");
      clickedSquare.innerText = "X" as string;
    } else {
      board.value[i].clickedBy = "player2";
      clickedSquare.classList.add("clicked-by-p-two");
      clickedSquare.innerText = "O";
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
    board.value[i].clickedBy === "";
    clickedSquare.innerText = "";

    player1.value = !player1.value;
    board.value[i].clicked = false;
  }
}
function startGameFn() {
  if (
    (board.value[0].clicked &&
      board.value[0].clickedBy === "player1" &&
      board.value[1].clicked &&
      board.value[1].clickedBy === "player1" &&
      board.value[2].clicked &&
      board.value[2].clickedBy === "player1") ||
    (board.value[0].clicked &&
      board.value[0].clickedBy === "player2" &&
      board.value[1].clicked &&
      board.value[1].clickedBy === "player2" &&
      board.value[2].clicked &&
      board.value[2].clickedBy === "player2")
    // (board.value[3].clicked &&
    //   board.value[4].clicked &&
    //   board.value[5].clicked) ||
    // (board.value[6].clicked &&
    //   board.value[7].clicked &&
    //   board.value[8].clicked) ||
    // (board.value[0].clicked &&
    //   board.value[3].clicked &&
    //   board.value[6].clicked) ||
    // (board.value[1].clicked &&
    //   board.value[4].clicked &&
    //   board.value[7].clicked) ||
    // (board.value[2].clicked &&
    //   board.value[5].clicked &&
    //   board.value[8].clicked) ||
    // (board.value[0].clicked &&
    //   board.value[4].clicked &&
    //   board.value[8].clicked) ||
    // (board.value[2].clicked && board.value[4].clicked && board.value[6].clicked)
  ) {
    winCongrats();
  }
}
function winCongrats() {
  if (player1.value === false) {
    console.log("Congratulations,player1!");
  }
  if (player1.value === true) {
    console.log("Congratulations,player2!");
  }
}
</script>
<template>
  <section class="game-wrapper" v-if="gameScr">
    <div>
      <span v-if="player1 === true">p1</span
      ><span v-if="player1 === false">p2</span>´s turn
    </div>
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
    <div>players square</div>
    <button id="reset-btn" @click="() => resetGame()">to be a reset btn</button>
    <div class="score-wrapper">
      <button @click="() => showHighscore()">Show scores</button>
      <section v-if="highscore">Highscores will show</section>
    </div>
    <button id="back-btn" @click="() => goToStartScr()">Back to Start</button>
  </section>
  <StartScreen v-if="startScr" />
</template>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.board-wrapper {
  height: 15.2rem;
  width: 15.25rem;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid black;
  gap: 0;
}
.clicked-by-none {
  background-color: rgba(135, 135, 135, 0.473);
}
.clicked-by-p-one {
  background-color: rgba(85, 49, 113, 0.473);
}
.clicked-by-p-two {
  background-color: rgba(49, 80, 113, 0.473);
}
.score-wrapper {
  margin-top: 2rem;
}
</style>
