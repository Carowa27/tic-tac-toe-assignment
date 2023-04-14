<script setup lang="ts"></script>
<template>
  <section class="modal"></section>
  <div class="modal-content">
    <p>img to be</p>
    <section class="info-wrapper">
      <p>test text</p>
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
}
.info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
}
</style>
