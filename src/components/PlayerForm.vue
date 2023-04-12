<script setup lang="ts">
import { ref } from "vue";
import FullGame from "./FullGame.vue";
import StartScreen from "./StartScreen.vue";
import { Player } from "../models/Player";
import { getPlayerListFromLS, setPlayerListInLS } from "../localStorageFns";
// Form for player names
let playerScr = ref(true);
let startScr = ref(false);
let gameScr = ref(false);

function goToStartScr() {
  startScr.value = true;
  playerScr.value = false;
}

let playerOneUsername = ref("");
let playerTwoUsername = ref("");
function goToGameScr() {
  playerScr.value = false;
  gameScr.value = true;
}
let playerOneAlreadyExist = ref(false);
let playerTwoAlreadyExist = ref(false);
function checkUsernames(playerOneName: string, playerTwoName: string) {
  playerOneAlreadyExist.value = false;
  playerTwoAlreadyExist.value = false;

  let playerList: Player[] = getPlayerListFromLS();
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i].username === playerOneName) {
      playerOneAlreadyExist.value = true;
    }
    if (playerList[i].username === playerTwoName) {
      playerTwoAlreadyExist.value = true;
    }
  }
  console.log(playerList);
}
function addPlayerNames(playerOneName: string, playerTwoName: string) {
  addPlayer(playerOneName);
  addPlayer(playerTwoName);
}

function addPlayer(playerName: string) {
  console.log(playerName);
  let playerList: Player[] = getPlayerListFromLS();
  if (playerList.length !== 0) {
    console.log(playerList);
    for (let i = 0; i < playerList.length; i++) {
      console.log(playerList);
      console.log(playerList[i].username);
      if (playerList[i].username === playerName) {
        console.log(playerList[i]);
      }
    }
  } else {
    let player = new Player(playerName);
    playerList.push(player);
    console.log(playerList, player);
  }
  setPlayerListInLS(playerList);
  console.log(playerList);
  goToGameScr();
  console.log("last in fn");

  // if()
  // let playerOne = new Player(playerOneName, 0);
  // let playerTwo = new Player(playerTwoName, 0);
  // //emit/prop till fullgame m usernames
  // playerList.push(playerOne);
  // playerList.push(playerTwo);
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
          Player1 ->
          <b>{{ playerOneUsername }}</b>
        </p>
        <p id="warning" v-if="playerOneAlreadyExist">
          Username already exist, if you want to continue using this profile,
          press play, or choose another username
        </p>
        <input type="text" id="player-one" v-model="playerOneUsername" />
      </label>
      <label for="player-two"
        ><p>
          Player2 -> <b>{{ playerTwoUsername }}</b>
        </p>
        <p id="warning" v-if="playerTwoAlreadyExist">
          Username already exist, if you want to continue using this profile,
          press play, or choose another username
        </p>
        <input type="text" id="player-two" v-model="playerTwoUsername" />
      </label>
      <div id="btn-section">
        <button
          type="button"
          id="check-btn"
          @click="() => checkUsernames(playerOneUsername, playerTwoUsername)"
        >
          Check usernames
        </button>
        <button type="submit" id="play-btn">Play</button>
      </div>
    </form>
    <button id="back-btn" @click="() => goToStartScr()">Back to Start</button>
  </section>
  <StartScreen v-if="startScr" />
  <FullGame v-if="gameScr" />
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
#btn-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#back-btn {
  max-width: max-content;
  align-self: center;
}
#play-btn {
  width: 10rem;
  align-self: center;
}
#warning {
  width: 20rem;
  color: red;
}
</style>
