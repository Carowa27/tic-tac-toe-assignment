<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import { Square } from "../models/Square";

// interface IWinnerProps {
//   players: Player[];
//   winner: Player;
//   player1: boolean;
//   board: Square[];
//   gotWinner: boolean;
//   endGame: boolean;
// }
// let playerInfo = defineProps<IWinnerProps>();

defineEmits(["startNewGame", "goToStart"]);

let startScr = ref(false);
let gameScr = ref(false);
let newGameModal = ref(true);
function goToGameScr() {
  newGameModal.value = false;
  gameScr.value = true;
}
// function goToStartScr() {
//   startScr.value = true;
//   newGameModal.value = false;
// }
</script>
<template>
  <section class="modal" v-if="newGameModal">
    <div class="modal-content">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif"
        alt="gengar"
        id="gengar"
      />
      <section class="info-wrapper">
        <p>No one won this game, try again!</p>
        <section class="btn-wrapper">
          <button @click="() => ($emit('startNewGame'), goToGameScr())">
            new game
          </button>
          <button @click="() => ($emit('goToStart'), goToGameScr())">
            back to start
          </button>
        </section>
      </section>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
        alt="squirtle"
        id="squirtle"
      />
    </div>
  </section>
  <StartScreen v-if="startScr" />
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
  border: 2px solid rgb(148, 255, 148);
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
  /* transform: scaleX(-1); */
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
