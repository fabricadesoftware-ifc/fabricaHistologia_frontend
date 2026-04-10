<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const submit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.email || !form.password || !form.confirmPassword) {
    errorMessage.value = 'Preencha todos os campos.'
    return
  }

  if (form.password.length < 8) {
    errorMessage.value = 'A senha precisa ter ao menos 8 caracteres.'
    return
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'A confirmação de senha não confere.'
    return
  }

  loading.value = true

  try {
    await authStore.register({ email: form.email, password: form.password })
    await authStore.login({ email: form.email, password: form.password })

    successMessage.value = 'Cadastro realizado com sucesso. Continue com seus dados pessoais.'
    router.push('/portal/personal-data')
  } catch (error) {
    const emailError = error?.response?.data?.email?.[0]
    const passwordError = error?.response?.data?.password?.[0]

    errorMessage.value =
      emailError ||
      passwordError ||
      error?.response?.data?.detail ||
      'Não foi possível concluir o cadastro.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="w-screen min-h-screen bg-slate-100 flex justify-center items-center p-4">
    <section class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-slate-800">Criar Conta</h1>
      <p class="text-sm text-slate-500 mt-1">Cadastre-se com email e senha para acessar o portal.</p>

      <form class="mt-6 flex flex-col gap-4" @submit.prevent="submit">
        <label class="flex flex-col gap-2 text-sm text-slate-700">
          Email
          <input
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </label>

        <label class="flex flex-col gap-2 text-sm text-slate-700">
          Senha
          <input
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </label>

        <label class="flex flex-col gap-2 text-sm text-slate-700">
          Confirmar senha
          <input
            v-model="form.confirmPassword"
            type="password"
            autocomplete="new-password"
            class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </label>

        <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-sm text-emerald-700">{{ successMessage }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="h-11 rounded-lg bg-slate-900 text-white font-medium disabled:opacity-60"
        >
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>
      </form>

      <p class="text-sm text-slate-600 mt-6">
        Já possui conta?
        <button class="text-slate-900 font-semibold" @click="router.push('/login')">
          Entrar
        </button>
      </p>
    </section>
  </main>
</template>
