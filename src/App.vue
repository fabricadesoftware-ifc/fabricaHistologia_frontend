<script setup>
import { RouterView } from 'vue-router'
import BackButtonComp from './components/backButtonComp.vue';
</script>

<template>
  <BackButtonComp :tittle="'voltar'"/>
  <router-link to="/login">login</router-link>
  <br>
  <router-link to="/test-components">test</router-link>
  <RouterView />
</template>
