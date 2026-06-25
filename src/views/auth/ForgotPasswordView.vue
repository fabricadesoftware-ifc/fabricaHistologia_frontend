<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth/auth'

const router = useRouter()

const step = ref('email') // 'email' | 'code' | 'password'
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

const passwordStrength = computed(() => {
  const pwd = form.password
  if (!pwd) return 0
  let strength = 0
  if (pwd.length >= 8) strength++
  if (pwd.length >= 12) strength++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
  if (/\d/.test(pwd)) strength++
  if (/[^a-zA-Z\d]/.test(pwd)) strength++
  return strength
})

const passwordStrengthText = computed(() => {
  const levels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte']
  return levels[passwordStrength.value] || 'Muito fraca'
})

const submitEmail = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.email) {
    errorMessage.value = 'Digite seu email.'
    return
  }

  loading.value = true

  try {
    await authService.forgetPassword(form.email)
    successMessage.value = 'Código enviado para seu email. Verifique sua caixa de entrada.'
    step.value = 'code'
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.error || 'Não foi possível enviar o código. Tente novamente.'
  } finally {
    loading.value = false
  }
}

const submitCode = async () => {
  errorMessage.value = ''

  if (!form.code) {
    errorMessage.value = 'Digite o código de recuperação.'
    return
  }

  // O código é validado no próximo step
  step.value = 'password'
}

const submitPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.password || !form.confirmPassword) {
    errorMessage.value = 'Preencha os campos de senha.'
    return
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'As senhas não conferem.'
    return
  }

  if (form.password.length < 8) {
    errorMessage.value = 'A senha deve ter no mínimo 8 caracteres.'
    return
  }

  loading.value = true

  try {
    await authService.recoverPassword(form.email, form.code, form.password)
    successMessage.value = 'Senha recuperada com sucesso! Redirecionando...'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.error ||
      'Código inválido ou expirado. Tente novamente.'
    step.value = 'email'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  if (step.value === 'email') {
    router.push('/login')
  } else if (step.value === 'code') {
    step.value = 'email'
    errorMessage.value = ''
    successMessage.value = ''
  } else if (step.value === 'password') {
    step.value = 'code'
    errorMessage.value = ''
  }
}
</script>

<template>
  <main class="w-screen min-h-screen bg-slate-100 flex justify-center items-center p-4">
    <section class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <!-- Step 1: Email -->
      <div v-if="step === 'email'">
        <h1 class="text-2xl font-semibold text-slate-800">Recuperar Senha</h1>
        <p class="text-sm text-slate-500 mt-1">
          Digite seu email para receber um código de recuperação.
        </p>

        <form class="mt-6 flex flex-col gap-4" @submit.prevent="submitEmail">
          <label class="flex flex-col gap-2 text-sm text-slate-700">
            Email
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </label>

          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-sm text-green-600">{{ successMessage }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="h-11 rounded-lg bg-slate-900 text-white font-medium disabled:opacity-60"
          >
            {{ loading ? 'Enviando...' : 'Enviar Código' }}
          </button>
        </form>

        <p class="text-sm text-slate-600 mt-6">
          <button
            @click="goBack"
            class="text-slate-900 font-semibold hover:underline"
          >
            Voltar ao login
          </button>
        </p>
      </div>

      <!-- Step 2: Code -->
      <div v-if="step === 'code'">
        <h1 class="text-2xl font-semibold text-slate-800">Código de Recuperação</h1>
        <p class="text-sm text-slate-500 mt-1">
          Digite o código de 4 dígitos que foi enviado para {{ form.email }}
        </p>

        <form class="mt-6 flex flex-col gap-4" @submit.prevent="submitCode">
          <label class="flex flex-col gap-2 text-sm text-slate-700">
            Código
            <input
              v-model="form.code"
              type="text"
              placeholder="0000"
              maxlength="4"
              class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300 text-center text-lg tracking-widest"
            />
          </label>

          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <button
            type="submit"
            class="h-11 rounded-lg bg-slate-900 text-white font-medium disabled:opacity-60"
          >
            Continuar
          </button>
        </form>

        <p class="text-sm text-slate-600 mt-6">
          <button
            @click="goBack"
            class="text-slate-900 font-semibold hover:underline"
          >
            Voltar
          </button>
        </p>
      </div>

      <!-- Step 3: Password -->
      <div v-if="step === 'password'">
        <h1 class="text-2xl font-semibold text-slate-800">Nova Senha</h1>
        <p class="text-sm text-slate-500 mt-1">
          Crie uma nova senha segura.
        </p>

        <form class="mt-6 flex flex-col gap-4" @submit.prevent="submitPassword">
          <label class="flex flex-col gap-2 text-sm text-slate-700">
            Nova Senha
            <input
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <div class="text-xs text-slate-600 mt-1">
              Força: <span :class="{
                'text-red-600': passwordStrength <= 1,
                'text-orange-600': passwordStrength === 2,
                'text-yellow-600': passwordStrength === 3,
                'text-lime-600': passwordStrength >= 4,
              }">{{ passwordStrengthText }}</span>
            </div>
          </label>

          <label class="flex flex-col gap-2 text-sm text-slate-700">
            Confirmar Senha
            <input
              v-model="form.confirmPassword"
              type="password"
              autocomplete="new-password"
              class="h-11 border border-slate-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </label>

          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="h-11 rounded-lg bg-slate-900 text-white font-medium disabled:opacity-60"
          >
            {{ loading ? 'Recuperando...' : 'Recuperar Senha' }}
          </button>
        </form>

        <p class="text-sm text-slate-600 mt-6">
          <button
            @click="goBack"
            class="text-slate-900 font-semibold hover:underline"
          >
            Voltar
          </button>
        </p>
      </div>
    </section>
  </main>
</template>
