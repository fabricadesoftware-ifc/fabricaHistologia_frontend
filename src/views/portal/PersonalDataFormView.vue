<script setup>
import { ref } from 'vue'
import { useCollaboratorsStore } from '@/stores/auth/collaborators';
import { BackButton, ContainerGlobal, Footer, PersonaDataForm, FormModal  } from '@/components';

const store = useCollaboratorsStore()

const succesMsg = ref(false)
</script>

<template>
    <ContainerGlobal class="py-8">
        <BackButton  />
        <PersonaDataForm />
    </ContainerGlobal>
    <FormModal v-show="succesMsg" />
    <Footer />
</template>