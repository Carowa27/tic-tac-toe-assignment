<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import { Square } from "../models/Square";
import { resetGame } from "../resetGameFn";
interface INoWinnerProps {
  players: Player[];
  player1: boolean;
  board: Square[];
  gotWinner: boolean;
  endGame: boolean;
}
let playerInfo = defineProps<INoWinnerProps>();

let gameScr = ref(false);
let noWinnerModal = ref(true);

function goToGameScr() {
  noWinnerModal.value = false;
  gameScr.value = true;
}
</script>
<template>
  <section class="modal" v-if="noWinnerModal">
    <div class="modal-content">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif"
        alt="gengar"
        id="gengar"
      />
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
        alt="squirtle"
        id="squirtle"
      />
      <section class="info-wrapper">
        <p>No one won this game, try again!</p>
        <section class="btn-wrapper">
          <button
            @click="
              resetGame(
                playerInfo.board,
                playerInfo.player1,
                playerInfo.gotWinner,
                playerInfo.endGame
              ),
                goToGameScr()
            "
          >
            new game
          </button>
          <button>highscores</button>
        </section>
      </section>
    </div>
  </section>
  <!-- <FullGame :players="playerInfo.players" v-if="gameScr" /> -->
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
  background-color: rgba(119, 119, 119, 0.944);
}
.modal-content {
  background-color: rgb(53, 53, 53);
  color: rgb(255, 255, 255);
  border: 2px solid rgb(248, 56, 56);
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  min-width: fit-content;
  width: 25rem;
  height: 15rem;
  transform: translate(0, -100%);
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
