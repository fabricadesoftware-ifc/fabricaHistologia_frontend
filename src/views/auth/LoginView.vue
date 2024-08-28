<script setup>
import '@passageidentity/passage-elements/passage-auth';
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div class="authContainer">
      <passage-auth
        app-id="2TXjjhFWhntb7WqVkG46xAmb"
      ></passage-auth>
    </div>
  </main>
</template>

<style>
.authContainer {
  min-width: 400px;
}
</style>