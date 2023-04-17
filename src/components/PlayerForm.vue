<script setup lang="ts">
import { ref } from "vue";
import FullGame from "./FullGame.vue";
import StartScreen from "./StartScreen.vue";
import { Player } from "../models/Player";
import { getPlayerListFromLS, setPlayerListInLS } from "../localStorageFns";
import { PlayerStats } from "../models/PlayerStats";
// Form for player names
let playerScr = ref(true);
let startScr = ref(false);
let gameScr = ref(false);

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
// function addPlayerNames(playerOneName: string, playerTwoName: string) {
//   addPlayer(playerOneName);
//   addPlayer(playerTwoName);
// }

let players: Player[] = [];

function addPlayerOne(playerName: string): Player[] {
  let playerList: Player[] = getPlayerListFromLS();
  console.log(playerList);
  if (playerList.length !== 0) {
    for (let i = 0; i < playerList.length; i++) {
      console.log(playerList[i], i);
      if (playerList[i].username === playerName) {
        players.push(playerList[i]);

        console.log("added", playerList[i], "to Game");
        return players;
      } else {
        const newPlayer = new Player(playerName);
        // playerList.push(newPlayer);
        // setPlayerListInLS(playerList);
        players.push(newPlayer);

        console.log("added", newPlayer, "to Game & LS");

        console.log("players list", players);
        console.log("LS list", playerList);
        return players;
      }
    }
  } else {
    const newPlayer = new Player(playerName);
    const newPlayerWStats = new PlayerStats(newPlayer, 0);
    // playerList.push(newPlayer);
    // setPlayerListInLS(playerList);
    players.push(newPlayer);

    console.log("added", newPlayer, "to Game & LS");

    console.log("players list", players);
    console.log("LS list", playerList);
  }
  return players;
}
function addPlayerTwo(playerName: string): Player[] {
  let playerList: Player[] = getPlayerListFromLS();
  console.log(playerList);
  if (playerList.length !== 0) {
    for (let i = 0; i < playerList.length; i++) {
      //minst en gång i loopen är fel vilket gör att den kommer att lägga till för många
      console.log(playerList[i], i);
      if (playerList[i].username === playerName) {
        players.push(playerList[i]);

        console.log("added", playerList[i], "to Game");
        return players;
      } else {
        const newPlayer = new Player(playerName);
        // playerList.push(newPlayer);
        // setPlayerListInLS(playerList);
        players.push(newPlayer);

        console.log("added", newPlayer, "to Game & LS");

        console.log("players list", players);
        console.log("LS list", playerList);
        return players;
      }
    }
  } else {
    const newPlayer = new Player(playerName);
    const newPlayerWStats = new PlayerStats(newPlayer, 0);
    // playerList.push(newPlayer);
    // setPlayerListInLS(playerList);
    players.push(newPlayer);

    console.log("added", newPlayer, "to Game & LS");

    console.log("players list", players);
    console.log("LS list", playerList);
  }
  return players;
}
</script>

<template>
  <section v-if="playerScr">
    <h3>Who is playing?</h3>
    <form
      @submit.prevent="
        () => (
          addPlayerOne(playerOneUsername),
          addPlayerOne(playerTwoUsername),
          goToGameScr()
        )
      "
    >
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
        <p id="warning" v-if="playerOneAlreadyExist">
          Username already exist, if you want to continue using this profile,
          press play, or choose another username
        </p>
        <input type="text" id="player-one" v-model="playerOneUsername" />
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
