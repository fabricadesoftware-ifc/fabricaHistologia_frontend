<script setup>
import { useCollaboratorsStore, useAuthStore, useNavigationStore } from '@/stores';
import { TitleGlobal, BtnDefault, MessageGlobal } from '@/components';
import { useRouter } from 'vue-router';
import { reactive, computed, onMounted, ref } from 'vue';

const router = useRouter();

const collaboratorStore = useCollaboratorsStore();
const authStore = useAuthStore();
const navigationStore = useNavigationStore();

const PersonaDataGeneric = reactive({
    name: '',
    registration: '',
    phone: '',
    university: '',
});

const PersonaDataSpecific = reactive({
    birth_date: null,
    education: '',
});

const PersonaAddress = reactive({
    state: '',
    city: '',
});

const education = reactive({
    'Médio': 'Médio',
    'Superior': 'Superior',
    'Pós Graduação': 'Pos-Graduação',
    'Mestrado': 'Mestrado',
    'Doutorado': 'Doutorado',
    'Pós doutorado': 'Pos-Doutorado'
});

const newCollaborator = computed(() => {
    return { ...PersonaDataSpecific, ...PersonaDataGeneric };
});

const validate_data = () => {
    if (
        newCollaborator.value.name === '' ||
        newCollaborator.value.registration === '' ||
        newCollaborator.value.phone === '' ||
        newCollaborator.value.university === '' ||
        !authStore.email
    ) {
        navigationStore.messageBody.title = 'Erro ao enviar o formulário';
        navigationStore.messageBody.description = 'Preencha todos os campos corretamente e confirme que está logado no portal.';
        navigationStore.formState = false;
        return false;
    }
    if (PersonaAddress.state === '' || PersonaAddress.city === '') {
        navigationStore.messageBody.title = 'Erro ao enviar o formulário';
        navigationStore.messageBody.description = 'Informe o Estado e a Cidade corretamente.';
        navigationStore.formState = false;
        return false;
    }
    return true;
};

async function saveCollaborator() {
    navigationStore.activeError = !navigationStore.activeError;

    if (!validate_data()) return;

    try {
        // Cria endereço primeiro
        const addressResponse = await collaboratorStore.postAddress(PersonaAddress);
        const addressId = addressResponse?.id;

        // Cria colaborador associado ao endereço
        await collaboratorStore.postCollaborators({
            ...newCollaborator.value,
            address: addressId
        });

        navigationStore.messageBody.title = 'Sucesso!';
        navigationStore.messageBody.description = 'Colaborador criado com sucesso. Aguarde a verificação das informações.';
        navigationStore.formState = true;
    } catch (error) {
        console.error('Erro ao salvar colaborador:', error);
        navigationStore.messageBody.title = 'Erro';
        navigationStore.messageBody.description = 'Não foi possível criar o colaborador. Tente novamente.';
        navigationStore.formState = false;
    }
}
</script>

<template>
    <TitleGlobal
        class="mb-10 text-center"
        content="Torne-se um Colaborador!"
        size="text-3xl xl:text-2xl sm:text-xl"
    />

    <!-- Dados genéricos -->
    <div v-for="(field, id) in PersonaDataGeneric" :key="id" class="relative p-0 pt-3 mt-5 w-full">
        <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">
            {{ id }}
        </p>
        <input type="text" class="border-2 rounded-md w-full h-10 pl-3" v-model="PersonaDataGeneric[id]" />
    </div>

    <!-- Data de Nascimento -->
    <div class="relative p-0 pt-3 mt-5 w-full">
        <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">
            Data de Nascimento
        </p>
        <input type="date" class="border-2 rounded-md w-full h-10 pl-3" v-model="PersonaDataSpecific.birth_date" />
    </div>

    <!-- Educação -->
    <div class="relative p-0 pt-3 mt-5 w-full">
        <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">
            Graduação
        </p>
        <select
            class="border-2 rounded-md w-full h-10 bg-white cursor-pointer appearance-none pl-3"
            v-model="PersonaDataSpecific.education"
        >
            <option v-for="(field, key) in education" :key="key" :value="field">{{ key }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center mt-3 px-2 text-gray-700">
            <svg
                class="fill-current h-7 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
            </svg>
        </div>
    </div>

    <!-- Endereço -->
    <div class="relative p-0 pt-3 mt-5 w-full">
        <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">
            Estado
        </p>
        <input type="text" class="border-2 rounded-md w-full h-10 pl-3" v-model="PersonaAddress.state" />
    </div>

    <div class="relative p-0 pt-3 mt-5 w-full">
        <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">
            Cidade
        </p>
        <input type="text" class="border-2 rounded-md w-full h-10 pl-3" v-model="PersonaAddress.city" />
    </div>

    <!-- Botão de envio -->
    <div class="mt-14 w-3/5" @click="saveCollaborator()">
        <BtnDefault text="Enviar" link="#" color="text-white" :block="true" />
    </div>
</template>
