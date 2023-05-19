<script setup lang="ts">
// The full game with all the squares
import { ref } from "vue";
import GameSquare from "./GameSquare.vue";
import StartScreen from "./StartScreen.vue";
import WinnerModal from "./WinnerModal.vue";
import { gameSquareList } from "../squareList";
import { Clicker, Square } from "../models/Square";
import { Player } from "../models/Player";
import NoWinnerModal from "./NoWinnerModal.vue";

interface IPlayersProps {
  players: Player[];
}
let activePlayers = defineProps<IPlayersProps>();

defineEmits(["goToStart"]);

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

function handleToggle(i: number) {
  console.log(i);
  board.value[i].clicked = true;
  if (board.value[i].clicked === true) {
    if (player1.value === true) {
      console.log("in double if");
      board.value[i].clickedBy = Clicker.Player1;
      console.log(board.value);
    } else {
      board.value[i].clickedBy = Clicker.Player2;
    }
    player1.value = !player1.value;
  }
  console.log(board.value);
}

let gotWinner = ref(false);
let endGame = ref(false);
let winner = ref();
function startGameFn() {
  let allClicked =
    board.value[0].clicked &&
    board.value[1].clicked &&
    board.value[2].clicked &&
    board.value[3].clicked &&
    board.value[4].clicked &&
    board.value[5].clicked &&
    board.value[6].clicked &&
    board.value[7].clicked &&
    board.value[8].clicked;
  const rowOnePOne =
    board.value[0].clickedBy === Clicker.Player1 &&
    board.value[1].clickedBy === Clicker.Player1 &&
    board.value[2].clickedBy === Clicker.Player1;
  const rowTwoPOne =
    board.value[3].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[5].clickedBy === Clicker.Player1;
  const rowThreePOne =
    board.value[6].clickedBy === Clicker.Player1 &&
    board.value[7].clickedBy === Clicker.Player1 &&
    board.value[8].clickedBy === Clicker.Player1;
  const columnOnePOne =
    board.value[0].clickedBy === Clicker.Player1 &&
    board.value[3].clickedBy === Clicker.Player1 &&
    board.value[6].clickedBy === Clicker.Player1;
  const columnTwoPOne =
    board.value[1].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[7].clickedBy === Clicker.Player1;
  const columnThreePOne =
    board.value[2].clickedBy === Clicker.Player1 &&
    board.value[5].clickedBy === Clicker.Player1 &&
    board.value[8].clickedBy === Clicker.Player1;
  const slashPOne =
    board.value[0].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[8].clickedBy === Clicker.Player1;
  const backSlashPOne =
    board.value[2].clickedBy === Clicker.Player1 &&
    board.value[4].clickedBy === Clicker.Player1 &&
    board.value[6].clickedBy === Clicker.Player1;
  const rowOnePTwo =
    board.value[0].clickedBy === Clicker.Player2 &&
    board.value[1].clickedBy === Clicker.Player2 &&
    board.value[2].clickedBy === Clicker.Player2;
  const rowTwoPTwo =
    board.value[3].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[5].clickedBy === Clicker.Player2;
  const rowThreePTwo =
    board.value[6].clickedBy === Clicker.Player2 &&
    board.value[7].clickedBy === Clicker.Player2 &&
    board.value[8].clickedBy === Clicker.Player2;
  const columnOnePTwo =
    board.value[0].clickedBy === Clicker.Player2 &&
    board.value[3].clickedBy === Clicker.Player2 &&
    board.value[6].clickedBy === Clicker.Player2;
  const columnTwoPTwo =
    board.value[1].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[7].clickedBy === Clicker.Player2;
  const columnThreePTwo =
    board.value[2].clickedBy === Clicker.Player2 &&
    board.value[5].clickedBy === Clicker.Player2 &&
    board.value[8].clickedBy === Clicker.Player2;
  const slashPTwo =
    board.value[0].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[8].clickedBy === Clicker.Player2;
  const backSlashPTwo =
    board.value[2].clickedBy === Clicker.Player2 &&
    board.value[4].clickedBy === Clicker.Player2 &&
    board.value[6].clickedBy === Clicker.Player2;
  const p1Winning =
    rowOnePOne ||
    rowTwoPOne ||
    rowThreePOne ||
    columnOnePOne ||
    columnTwoPOne ||
    columnThreePOne ||
    slashPOne ||
    backSlashPOne;
  const p2Winning =
    rowOnePTwo ||
    rowTwoPTwo ||
    rowThreePTwo ||
    columnOnePTwo ||
    columnTwoPTwo ||
    columnThreePTwo ||
    slashPTwo ||
    backSlashPTwo;
  if (p1Winning || (allClicked && p1Winning)) {
    console.log("Congratulations,player1!");
    gotWinner.value = true;
    winner.value = activePlayers.players[0];
    gameScr.value = false;
  }
  if (p2Winning || (allClicked && p2Winning)) {
    console.log("Congratulations,player2!");
    gotWinner.value = true;
    winner.value = activePlayers.players[1];
    gameScr.value = false;
  }
  if (allClicked && !p1Winning && !p2Winning) {
    console.log("no winner this time");
    endGame.value = true;
    gameScr.value = false;
  }
}

function startNewGame() {
  console.log("Reset btn clicked");
  for (let i = 0; i < board.value.length; i++) {
    console.log("in loop");
    board.value[i].clicked = false;
    board.value[i].clickedBy = Clicker.None;
  }

  endGame.value = false;
  gotWinner.value = false;
  gameScr.value = true;
}
</script>
<template>
  <section class="game-wrapper" v-if="gameScr">
    <div class="turn-teller">
      <span v-if="player1 === true">{{ players[0].username }}</span
      ><span v-if="player1 === false">{{ players[1].username }}</span
      >´s turn
    </div>
    <section class="game-mat">
      <div class="board-wrapper">
        <GameSquare
          :square="square"
          v-for="(square, id) in board"
          :id="id"
          @toggle-clicked="() => (handleToggle(id), startGameFn())"
          :key="id"
          class="clicked-by-none"
          :class="{
            'clicked-by-p-one': square.clickedBy === Clicker.Player1,
            'clicked-by-p-two': square.clickedBy === Clicker.Player2,
          }"
        ></GameSquare>
      </div>
      <div class="player-wrapper">
        <b> <span>username</span> </b>
        <p class="player-stat">
          <img
            id="user-gengar"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/94.png"
            alt="gengar"
          />
          <span>{{ players[0].username }}</span>
        </p>
        <p class="player-stat">
          <img
            id="user-squirtle"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/7.png"
            alt="squirtle"
          />
          <span>{{ players[1].username }}</span>
        </p>
      </div>
    </section>
    <button id="back-btn" @click="() => goToStartScr()">Back to Start</button>
  </section>
  <StartScreen v-if="startScr" />
  <WinnerModal
    :got-winner="gotWinner"
    :end-game="endGame"
    :player1="player1"
    :board="board"
    :players="players"
    :winner="winner"
    v-if="gotWinner"
    @start-new-game="startNewGame"
  />
  <NoWinnerModal
    :players="players"
    :got-winner="gotWinner"
    :end-game="endGame"
    :player1="player1"
    :board="board"
    v-if="endGame"
    @start-new-game="startNewGame"
  />
</template>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-mat {
  display: flex;
}
.turn-teller {
  padding: 1rem;
}
.board-wrapper {
  height: 15.2rem;
  width: 15.25rem;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid black;
  gap: 0;
  justify-content: space-evenly;
  align-items: space-evenly;
  background-color: black;
}
.player-wrapper {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 10rem;
}
.player-stat {
  margin: 0;
  padding-top: 0.3rem;
  width: 75%;
  border-bottom: 1px solid rgb(95, 95, 95);
  display: flex;
  align-items: center;
}
.clicked-by-none {
  background-color: rgb(164, 164, 164);
}
.clicked-by-p-one {
  background-color: rgba(165, 133, 190, 0.688);
}
.clicked-by-p-two {
  background-color: rgba(166, 206, 227, 0.688);
}
.score-wrapper {
  margin-top: 2rem;
}
#gengar {
  max-width: 100%;
}

#squirtle {
  max-width: 100%;
}
#user-gengar {
  height: 2rem;
  margin: 0 0.4rem;
  transform: scaleX(-1);
}
#user-squirtle {
  height: 2.8rem;
  transform: scaleX(-1);
}
#reset-btn,
#back-btn {
  margin-top: 2rem;
}
</style>
