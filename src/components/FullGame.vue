<script setup lang="ts">
// The full game with all the squares
import { ref } from "vue";
import { Player } from "../models/Player";
import GameSquare from "./GameSquare.vue";

let player1 = ref(true);
function gameClick(/*player: Player,*/ id: string) {
  console.log(id, "clicked");
  let clickedSquare = document.getElementById(id);
  if (player1.value) {
    clickedSquare?.classList.add("clicked-by-p-one");
  } else {
    clickedSquare?.classList.add("clicked-by-p-two");
  }
  player1.value = !player1.value;
}
let highscore = ref(false);
function showHighscore() {
  highscore.value = !highscore.value;
  console.log(highscore);
}
</script>
<template>
  <div>player X turn</div>
  <div class="game-wrapper">
    <GameSquare
      id="square-one-a"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-one-b"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-one-c"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-two-a"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-two-b"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-two-c"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-three-a"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-three-b"
      @click.once="(event) => gameClick(event.target.id)"
    />
    <GameSquare
      id="square-three-c"
      @click.once="(event) => gameClick(event.target.id)"
    />
  </div>
  <div>players square</div>
  <div class="score-wrapper">
    <button @click="() => showHighscore()">Show scores</button>
    <section v-if="highscore">Highscores will show</section>
  </div>
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
