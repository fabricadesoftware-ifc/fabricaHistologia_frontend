<script setup>
import { RouterView } from 'vue-router'
import BackButtonComp from './components/backButtonComp.vue';
</script>

<template>
  <BackButtonComp :tittle="'voltar'"/>
  <router-link to="/test-components">comps</router-link>
  <br>
  <router-link to="/login">login</router-link>
  <br>
  <router-link to="/test-one">One</router-link>
  <br>
  <router-link to="/test-two">Two</router-link>
  <RouterView />
</template>
