<script setup>
import { useNavigationStore, useCollaboratorsStore, useAuthStore } from '@/stores';
import { BackButton, ContainerGlobal, Footer, PersonaDataForm, FormModal, MessageGlobal  } from '@/components';

import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
const router = useRouter()
const store = useCollaboratorsStore()
const navigationStore = useNavigationStore()
const authStore = useAuthStore()

const go = () => {
    navigationStore.showFormState ? router.push('/') : ''
}
onMounted(()=> {
    if (authStore.userInfo.is_verified) {
        navigationStore.title = "Você já é um colaborador"
        navigationStore.activeError = true
    }
})

</script>

<template>
    <main class=" min-h-screen-minus-80 relative">
    <MessageGlobal @action="go" />
    <BackButton :title="'Voltar a página Inicial'" :set-back-off="true" @navigate="router.push('/')" class=" top-10 left-24" />
    <section class="w-full min-h-screen-minus-80 flex justify-center items-center flex-col gap-2" v-if="!authStore.activeUser">
        <h1 class="text-3xl">Permissão negada para entrar nesta página</h1>
        <p class="text-xl mb-16">É necessário ter iniciado sessão com sua conta no portal para acessar esse serviço</p>
    </section>
    <ContainerGlobal v-else class="py-8">
        <PersonaDataForm />
    </ContainerGlobal>
    <FormModal v-show="store.successMsg" />
    </main>
    <Footer />
</template>