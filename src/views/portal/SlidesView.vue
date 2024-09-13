<script setup>
import {
  ContainerGlobal,
  CardsContainer,
  SlideCards,
  AddInfoGlobal,
  BtnDefault,
  Footer,
  HeaderPortal
} from '@/components/index'
</script>
<template>
  <main class="w-dvh">
    <HeaderPortal title="Estômago" />
    <CardsContainer class="mb-8" noFlex>
      <SlideCards />
    </CardsContainer>
    <ContainerGlobal class="flex justify-center flex-col">
      <AddInfoGlobal />
      <BtnDefault :text="'Acessar Quiz deste Órgão'" :block="true" class="mt-12" />
    </ContainerGlobal>
    <Footer class="mt-12" />
  </main>
</template>
