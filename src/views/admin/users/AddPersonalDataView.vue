<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore, useCollaboratorsStore } from '@/stores'
import {
  AdminGlobalContainer,
  BtnDefault,
  InputStringAdmin,
  SucessModalAdmin,
  LoadingSpinner,
  InputSelectAdmin
} from '@/components/index'
import router from '@/router'

const authStore = useAuthStore()
const personalDataStore = useCollaboratorsStore()

// Dados do formulário de PersonalData
const newPersonalData = reactive({
  name: '',
  registration: '',
  birth_date: '',
  phone: '',
  education_level: '',
  university: '',
  user: '',
})

const newAddress = reactive({
    city: '',
    state: '',
})

// States
const loading = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  await personalDataStore.getUsers()
})

const usersToSelect = computed(()=> personalDataStore.users.map(user => ({
  id: user.id,
  name: user.email
}))
)

const education = reactive([
  { id: 'Médio', name: 'Médio' },
  { id: 'Superior', name: 'Superior' },
  { id: 'Pós Graduação', name: 'Pós Graduação' },
  { id: 'Mestrado', name: 'Mestrado' },
  { id: 'Doutorado', name: 'Doutorado' },
  { id: 'Pós doutorado', name: 'Pós doutorado' }
])

// Função de envio do formulário
const send = async () => {
  loading.value = true
  try {
    if (newAddress.city != '' || newAddress.state != '') {
       const response = await personalDataStore.postAddress(newAddress)
    await personalDataStore.postCollaborators({ ...newPersonalData, address: response.id })
    }
  await personalDataStore.postCollaborators({ ...newPersonalData })
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/users')
    }, 1000)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => (Array.isArray(v) ? v.join(', ') : v))
        .join('\n')
        if (personalDataStore.currentAdress) {
      await personalDataStore.deleteAddress(personalDataStore.currentAdress.id)
    } 
    showErrorModal.value = true
}
  } finally {
    loading.value = false
  }
}

// Fecha modal de erro
function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading overlay -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <LoadingSpinner class="mt-0" />
    </div>

    <!-- Formulário -->
    <div v-else class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputSelectAdmin label="Usuário" :modelValue="newPersonalData.user" :options="usersToSelect" @action="newPersonalData.user = $event" />
        <InputStringAdmin label="Nome" :modelValue="newPersonalData.name" @action="newPersonalData.name = $event" />
        <InputStringAdmin label="Matrícula" :modelValue="newPersonalData.registration" @action="newPersonalData.registration = $event" />
        <InputStringAdmin label="Data de Nascimento" type="date" :modelValue="newPersonalData.birth_date" @action="newPersonalData.birth_date = $event" />
        <InputStringAdmin label="Telefone" :modelValue="newPersonalData.phone" @action="newPersonalData.phone = $event" />
        <InputSelectAdmin label="Nível de Educação" :modelValue="newPersonalData.education_level" :options="education" @action="newPersonalData.education_level = $event" />
        <InputStringAdmin label="Universidade" :modelValue="newPersonalData.university" @action="newPersonalData.university = $event" />
        <InputStringAdmin label="Cidade" :modelValue="newAddress.city" @action="newAddress.city = $event" />
        <InputStringAdmin label="Estado" :modelValue="newAddress.state" @action="newAddress.state = $event" />

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de Sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Dados Pessoais Cadastrados"
    :duration="1"
    confirm-label=""
    cancel-label=""
  />

  <!-- Modal de Erro -->
  <SucessModalAdmin
    :show="showErrorModal"
    subtitle="Erro!"
    :title="errorMessage"
    message="Tente novamente ou contate o suporte."
    confirm-label="Fechar"
    :cancel-label="null"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="closeErrorModal"
  />
</template>
