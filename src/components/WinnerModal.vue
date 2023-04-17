<script setup lang="ts">
import { Player } from "../models/Player";

//send winner player
interface IWinnerProps {
  players: Player[];
  winner: Player;
}
let playerInfo = defineProps<IWinnerProps>();
let whoIswinner = "";
console.log(playerInfo.players[0].username);
console.log(playerInfo.winner.username);
if (playerInfo.winner === playerInfo.players[0]) {
  console.log("player 1 is the winner");
  whoIswinner = "player1";
}
if (playerInfo.winner === playerInfo.players[1]) {
  console.log("player 2 is the winner");
  whoIswinner = "player2";
}
</script>
<template>
  <section class="modal"></section>
  <div class="modal-content">
    <img
      v-if="playerInfo.winner.username === playerInfo.players[0].username"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif"
      alt="gengar"
      id="gengar"
    />
    <img
      v-else
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
      alt="squirtle"
      id="squirtle"
    />
    <section class="info-wrapper">
      <section>
        <h3>
          Congratulations, <i id="winner">{{ playerInfo.winner.username }}</i
          >!
        </h3>

        <p>You won the game!</p>
      </section>
      <section class="btn-wrapper">
        <button>new game (reset fn)</button>
        <button>highscores</button>
      </section>
    </section>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  /* z-index: 1; */
  padding-top: 50%; /*location of box on screen */
  left: 0;
  top: 0;
  width: 100%; /*Full width */
  height: 100%; /* Full height */
  background-color: rgba(44, 95, 14, 0.508);
}
.modal-content {
  background-color: rgb(53, 53, 53);
  color: rgb(255, 255, 255);
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  min-width: fit-content;
  width: 25rem;
  height: 15rem;
  transform: translate(0, -150%);
  display: flex;
  padding: 2rem;
  justify-content: space-evenly;
}
button {
  width: fit-content;
  min-width: 10rem;
  max-width: 15rem;
  align-self: center;
}
.info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  padding: 1rem;
}
.btn-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50%;
}
#gengar {
  width: 7rem;
  transform: scaleX(-1);
  align-self: center;
  margin-left: 1rem;
}
#squirtle {
  width: 5rem;
  transform: scaleX(-1);
  align-self: center;
  margin: 1rem;
}
h3 {
  margin: 0;
}
p {
  margin: 0;
}
#winner {
  font-variant: small-caps;
}
</style>
