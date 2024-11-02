<script setup>
import { useNavigationStore, useCollaboratorsStore } from '@/stores';
import { BackButton, ContainerGlobal, Footer, PersonaDataForm, FormModal, MessageGlobal  } from '@/components';

import { useRouter } from 'vue-router';
const router = useRouter()
const store = useCollaboratorsStore()
const navigationStore = useNavigationStore()

const go = () => {
    navigationStore.showFormState ? router.push('/') : ''
}

</script>

<template>
    <main class=" min-h-screen-minus-80 relative">
    <MessageGlobal @action="go" />
    <ContainerGlobal class="py-8">
        <BackButton  />
        <PersonaDataForm />
    </ContainerGlobal>
    <FormModal v-show="store.successMsg" />
    </main>
    <Footer />
</template>