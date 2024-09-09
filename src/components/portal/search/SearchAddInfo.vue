<script setup>
import { BtnDefault, BtnStroke, ContainerGlobal } from '@/components';
</script>

<template>
   <ContainerGlobal class="mt-28">
       <h3 class="text-2xl font-medium font-poppins">Não Achou oque procurava?</h3>
       <p class="text-stone-700 mt-1 font-normal font-poppins">Nós ajude a melhorar fazendo parte do grupo de colaboradores! acesse o link a baixo e solicite uma conta. Nós ajude a melhorar fazendo parte do grupo de colaboradores! acesse o link a baixo e solicite uma conta. </p>
      <div class="flex justify-end gap-10 mt-5">
         <BtnStroke :text="'Perguntas Frequentes'" :border="'border-black'" :color="'text-black'" /> 
         <BtnDefault :text="'Ser um Colaborador'" :color="'text-white'" :background="'bg-black'" />
      </div>
   </ContainerGlobal>
</template>