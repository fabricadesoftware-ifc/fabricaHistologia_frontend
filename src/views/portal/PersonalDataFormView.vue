<script setup>
import { useCollaboratorsStore } from '@/stores/auth/collaborators';
import { BackButton, ContainerGlobal, Footer, PersonaDataForm, FormModal  } from '@/components';

const store = useCollaboratorsStore()


</script>

<template>
    <ContainerGlobal class="py-8">
        <BackButton  />
        <PersonaDataForm />
    </ContainerGlobal>
    <FormModal v-show="store.successMsg" />
    <Footer />
</template>