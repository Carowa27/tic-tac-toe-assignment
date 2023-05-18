<script setup lang="ts">
import { ref } from "vue";
import { Square } from "../models/Square";
// A square for tictactoe
interface IShowSquareProps {
  square: Square;
}
defineProps<IShowSquareProps>();
</script>

<template>
  <div class="game-square" @click.once="() => $emit('toggleClicked')"></div>
</template>

<style scoped>
.game-square {
  height: 32.5%;
  width: 32.5%;
  border: 1px solid black;
  display: flex;
  /* justify-content: space-evenly;
  align-items: space-evenly; */
}
</style>
