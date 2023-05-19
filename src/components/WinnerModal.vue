<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import { Square } from "../models/Square";

//send winner player
interface IWinnerProps {
  players: Player[];
  winner: Player;
  player1: boolean;
  board: Square[];
  gotWinner: boolean;
  endGame: boolean;
}
let playerInfo = defineProps<IWinnerProps>();

defineEmits(["startNewGame"]);

let gameScr = ref(false);
let winnerModal = ref(true);
function goToGameScr() {
  winnerModal.value = false;
  gameScr.value = true;
}
let players = playerInfo.players;
</script>
<template>
  <section class="modal" v-if="winnerModal">
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
          <button
            :class="{
              'win--gengar':
                playerInfo.winner.username === playerInfo.players[0].username,
              'win--squirtle':
                playerInfo.winner.username === playerInfo.players[1].username,
            }"
            @click="() => ($emit('startNewGame'), goToGameScr())"
          >
            new game
          </button>
        </section>
      </section>
    </div>
  </section>
</template>
<style scoped>
.modal {
  position: fixed;
  padding-top: 50vh;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(119, 119, 119, 0.944);
}
.modal-content {
  background-color: rgb(53, 53, 53);
  color: rgb(255, 255, 255);
  border: 3px solid rgb(148, 255, 148);
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  min-width: fit-content;
  width: 25rem;
  height: 15rem;
  transform: translate(0, -50%);
  display: flex;
  padding: 2rem;
  justify-content: space-evenly;
}
button {
  width: fit-content;
  min-width: 10rem;
  max-width: 15rem;
  align-self: center;
  border: 1px solid rgba(1, 125, 1, 0.539);
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
.win--gengar {
  background-color: rgba(165, 133, 190, 0.688);
}
.win--squirtle {
  background-color: rgba(166, 206, 227, 0.688);
}
</style>
