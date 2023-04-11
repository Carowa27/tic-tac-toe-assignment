<script setup lang="ts">
// A square for tictactoe
</script>

<template>
  <div class="game-square"></div>
</template>

<style scoped>
.game-square {
  height: 5rem;
  width: 5rem;
  border: 1px solid black;
}
</style>
<!-- :class="
      playerOne.username === 'player1' ? 'clicked-by-p-one' : 'clicked-by-p-two'
    " -->
