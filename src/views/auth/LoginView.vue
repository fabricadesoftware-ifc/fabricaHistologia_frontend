<script setup>
import '@passageidentity/passage-elements/passage-auth';
const tokenPassage = import.meta.env.VITE_TOKEN_PASSAGE;

</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div class="authContainer">
      <passage-auth
        :app-id="tokenPassage"
      ></passage-auth>
    </div>
  </main>
</template>

<style>
.authContainer {
  min-width: 400px;
}
</style>