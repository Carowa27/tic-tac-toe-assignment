<script setup lang="ts">
import { ref } from "vue";
import PlayerForm from "./PlayerForm.vue";

// Start screen for game and stats
let startScr = ref(true);
let player = ref(false);

function goToPlayScr() {
  startScr.value = false;
  player.value = true;
}
</script>

<template>
  <section v-if="startScr">
    <button @click="() => goToPlayScr()">Play</button>
  </section>
  <PlayerForm v-if="player" />
</template>

<style scoped>
section {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
</style>
