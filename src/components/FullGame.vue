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
  console.log(i);
  board.value[i].clicked = !board.value[i].clicked;
  let clickedSquare = document.getElementById(i.toString());
  if (board.value[i].clicked === true) {
    if (player1.value === true) {
      console.log("in double if");
      clickedSquare?.classList.add("clicked-by-p-one");
    } else {
      clickedSquare?.classList.add("clicked-by-p-two");
    }
    player1.value = !player1.value;
  }
  console.log(board.value[i]);
}
</script>
<template>
  <section v-if="gameScr">
    <div>
      <span v-if="player1 === true">p1</span
      ><span v-if="player1 === false">p2</span>´s turn
    </div>
    <div class="game-wrapper">
      <GameSquare
        :square="square"
        v-for="(square, id) in board"
        :id="id"
        @toggle-clicked="() => handleToggle(id)"
        :key="id"
        class="clicked-by-none"
      />
    </div>
    <div>players square</div>
    <button>to be a reset btn</button>
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
