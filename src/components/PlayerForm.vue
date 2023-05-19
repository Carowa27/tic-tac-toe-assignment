<script setup lang="ts">
import { ref } from "vue";
import FullGame from "./FullGame.vue";
import StartScreen from "./StartScreen.vue";
import { Player } from "../models/Player";
// Form for player names
let playerScr = ref(true);
let startScr = ref(false);
let gameScr = ref(false);
let usernameError = ref(false);

function goToStartScr() {
  startScr.value = true;
  playerScr.value = false;
}

function goToGameScr() {
  playerScr.value = false;
  gameScr.value = true;
}

let playerOneUsername = ref("");
let playerTwoUsername = ref("");

let players: Player[] = [];

const addPlayer = (playerName: string) => {
  const newPlayer = new Player(playerName);
  players.push(newPlayer);

  console.log("added", newPlayer, "to Game & LS");

  console.log("players list", players);
  return players;
};
const checkUsernames = () => {
  if (
    playerOneUsername.value.length >= 2 &&
    playerTwoUsername.value.length >= 2
  ) {
    addPlayer(playerOneUsername.value);
    addPlayer(playerTwoUsername.value);
    goToGameScr();
  } else {
    usernameError.value = true;
  }
};
</script>

<template>
  <section v-if="playerScr">
    <h3>Who is playing?</h3>
    <form @submit.prevent="() => checkUsernames()">
      <label for="player-one"
        ><section class="label-row">
          <img
            id="label-gengar"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/94.png"
            alt="gengar"
          />
          <p>
            Player1 ->
            <b>{{ playerOneUsername }}</b>
          </p>
        </section>
        <input
          type="text"
          id="player-one"
          v-model="playerOneUsername"
          minlength="2"
          placeholder="add username p1"
        />
      </label>
      <label for="player-two"
        ><section class="label-row">
          <img
            id="label-squirtle"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/7.png"
            alt="squirtle"
          />
          <p>
            Player2 -> <b>{{ playerTwoUsername }}</b>
          </p>
        </section>
        <input
          type="text"
          id="player-two"
          v-model="playerTwoUsername"
          minlength="2"
          placeholder="add username p2"
        />
      </label>
      <p id="warning" v-if="usernameError">
        username is too short, needs to be 2 or more characters
      </p>
      <button type="submit" id="play-btn">Play</button>
    </form>
    <button id="back-btn" @click="() => goToStartScr()">Back to Start</button>
  </section>
  <StartScreen v-if="startScr" />
  <FullGame :players="players" v-if="gameScr" />
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
.label-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#label-gengar {
  height: 2rem;
  margin: 0 0.4rem;
  transform: scaleX(-1);
}
#label-squirtle {
  height: 2.8rem;
  transform: scaleX(-1);
}
</style>
