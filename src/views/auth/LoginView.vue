<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = ''

  if (!form.email || !form.password) {
    errorMessage.value = 'Preencha email e senha para continuar.'
    return
  }

  loading.value = true

  try {
    const user = await authStore.login({ email: form.email, password: form.password })

    if (!user?.is_verified) {
      router.push('/portal/personal-data')
      return
    }

    router.push('/portal')
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.detail ||
      'Não foi possível entrar. Verifique suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="w-screen min-h-screen bg-slate-100 flex justify-center items-center p-4">
    <section class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-slate-800">Entrar</h1>
      <p class="text-sm text-slate-500 mt-1">Acesse sua conta com email e senha.</p>

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
            autocomplete="current-password"
            class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </label>

        <div class="flex justify-end">
          <button
            type="button"
            @click="router.push('/forgot-password')"
            class="text-sm text-slate-600 hover:text-slate-900 hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>

        <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="h-11 rounded-lg bg-slate-900 text-white font-medium disabled:opacity-60"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="text-sm text-slate-600 mt-6">
        Ainda não possui conta?
        <button class="text-slate-900 font-semibold" @click="router.push('/register')">
          Criar cadastro
        </button>
      </p>
    </section>
  </main>
</template>