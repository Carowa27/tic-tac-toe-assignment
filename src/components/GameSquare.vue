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
  <div class="game-square" @click="() => $emit('toggleClicked')"></div>
</template>

<style scoped>
.game-square {
  height: 5rem;
  width: 5rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
