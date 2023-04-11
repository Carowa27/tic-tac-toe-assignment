<script setup lang="ts">
import { ref } from "vue";
import FullGame from "./FullGame.vue";
import StartScreen from "./StartScreen.vue";
import { Player } from "../models/Player";
// Form for player names
let playerScr = ref(true);
let startScr = ref(false);
let game = ref(false);

function goToStartScr() {
  startScr.value = true;
  playerScr.value = false;
}

let playerOneUsername = ref("");
let playerTwoUsername = ref("");
function goToGameScr() {
  playerScr.value = false;
  game.value = true;
}
function addPlayerNames(playerOneName: string, playerTwoName: string) {
  console.log(playerOneName);
  console.log(playerTwoName);

  // if(playerOneName)
  // let playerOne=new Player(playerOneName,0)
  //emit/prop till fullgame m usernames
  goToGameScr();
}
</script>

<template>
  <section v-if="playerScr">
    <h3>Who is playing?</h3>
    <form
      @submit.prevent="
        () => addPlayerNames(playerOneUsername, playerTwoUsername)
      "
    >
      <label for="player-one">
        <p>
          Player1 -> <b>{{ playerOneUsername }}</b>
        </p>
        <input type="text" id="player-one" v-model="playerOneUsername" />
      </label>
      <label for="player-two"
        ><p>
          Player2 -> <b>{{ playerTwoUsername }}</b>
        </p>
        <input type="text" id="player-two" v-model="playerTwoUsername" />
      </label>
      <button type="submit" id="play-btn">Play</button>
    </form>
    <button id="back-btn" @click="() => goToStartScr()">Back to Start</button>
  </section>
  <StartScreen v-if="startScr" />
  <FullGame v-if="game" />
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: left;
}
p {
  margin: 0;
  text-align: left;
}
input {
  width: 100%;
}
#back-btn {
  max-width: max-content;
  align-self: center;
}
#play-btn {
  width: 10rem;
  align-self: center;
}
</style>
