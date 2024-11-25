<script setup>
import { BtnDefault, BtnStroke, ContainerGlobal } from '@/components';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore()
</script>

<template>
   <ContainerGlobal class="mt-28">
       <h3 class="text-2xl font-medium font-poppins">Não Achou oque procurava?</h3>
       <p class="text-stone-700 mt-1 font-normal font-poppins">Nós ajude a melhorar fazendo parte do grupo de colaboradores! acesse o link a baixo e solicite uma conta. Nós ajude a melhorar fazendo parte do grupo de colaboradores! acesse o link a baixo e solicite uma conta. </p>
      <div class="flex justify-end gap-10 mt-5 mb-4 flex-wrap">
         <BtnStroke :text="'Perguntas Frequentes'" :border="'border-black'" :color="'text-black'" />
         <BtnDefault v-if="authStore.email != ''" link="/portal/personal-data" :text="'Ser um Colaborador'" :color="'text-white'" :background="'bg-black'" class="hover:invert-14 " />
      </div>
   </ContainerGlobal>
</template>