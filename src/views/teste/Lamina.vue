<script setup>
import { ref } from 'vue'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
} from '@/components/index'

// Refs para os campos
const nome = ref('')
const nivelEducacao = ref('medio')
const dataAnalise = ref('')
const imagem = ref(null)

// Opções do select
const opcoesEducacao = [
  { label: 'Fundamental', value: 'fundamental' },
  { label: 'Médio', value: 'medio' },
  { label: 'Superior', value: 'superior' },
]
</script>

<template>
  <div class="flex">
    <NavLateralAdmin />
    
    <div class="flex-1 p-6 space-y-6">
      <!-- Botões do topo -->
      <ButtonActionAdmin />

      <!-- Formulário -->
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Nome -->
        <InputStringAdmin
          label="Nome"
          :modelValue="nome"
          @action="nome = $event"
        />

        <!-- Nível da Educação -->
        <InputSelectAdmin
          label="Nível da educação"
          :modelValue="nivelEducacao"
          :options="opcoesEducacao"
          @action="nivelEducacao = $event"
        />

        <!-- Data de Análise -->
        <InputDateAdmin
          label="Data de Análise"
          :modelValue="dataAnalise"
          @action="dataAnalise = $event"
        />

        <!-- Upload de Imagem -->
        <div class="md:col-span-2">
          <InputImageAdmin
            label="Imagem"
            :modelValue="imagem"
            @action="imagem = $event"
          />
        </div>
      </form>
    </div>
  </div>
</template>
