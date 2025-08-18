<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },

  /** Textos */
  subtitle: { type: String, default: "Sucesso!" },
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  confirmLabel: { type: String, default: "Sim" },
  cancelLabel: { type: String, default: "Não" },

  /** Classes (permite customização via Tailwind) */
  subtitleClass: {
    type: String,
    default: "text-sm font-medium text-green-600",
  },
  titleClass: {
    type: String,
    default: "text-xl font-semibold text-gray-900 mt-1",
  },
  messageClass: {
    type: String,
    default: "text-gray-500 text-sm mt-1",
  },
  confirmClass: {
    type: String,
    default:
      "bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-xl shadow-sm",
  },
  cancelClass: {
    type: String,
    default: "text-gray-700 font-medium hover:underline",
  },

  /** Opções */
  closeOnOverlay: { type: Boolean, default: true },
})

const emit = defineEmits(["confirm", "cancel"])

function onConfirm() {
  emit("confirm")
}
function onCancel() {
  emit("cancel")
}
</script>
<template>
  <!-- Overlay -->
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <!-- Fundo escuro -->
    <div
      class="absolute inset-0 bg-gray-500 bg-opacity-50"
      @click="closeOnOverlay && onCancel()"
    ></div>

    <!-- Card -->
    <div
      class="relative bg-white rounded-2xl p-6 shadow-lg w-[90%] max-w-md z-10"
    >
      <!-- Título pequeno -->
      <p v-if="subtitle" :class="subtitleClass">{{ subtitle }}</p>

      <!-- Título principal -->
      <h2 v-if="title" :class="titleClass">{{ title }}</h2>

      <!-- Mensagem -->
      <p v-if="message" :class="messageClass">
        {{ message }}
      </p>

      <!-- Botões -->
      <div class="flex justify-end items-center gap-4 mt-6">
        <button
          v-if="cancelLabel"
          @click="onCancel"
          :class="cancelClass"
        >
          {{ cancelLabel }}
        </button>
        <button
          v-if="confirmLabel"
          @click="onConfirm"
          :class="confirmClass"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>


