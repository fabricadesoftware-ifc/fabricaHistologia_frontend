<script setup>
import { ref } from 'vue';
import ContainerGlobal from '@/components/layout/ContainerGlobal.vue'
import { useSupportingStore } from '@/stores';

const supportingStore = useSupportingStore()
const name = ref('')

function setName() {
    name.value = supportingStore.state.nameHistory
}
const emits = defineEmits([
    'search', 'save'
])

</script>

<template>
    <ContainerGlobal>
        <div class="w-3/4 mx-auto">
            <div class="bg-[#F1F1F1] w-full rounded-lg h-12 flex">
                <input type="text" v-model="name" @keyup="emits('search', name)" @keydown.enter="emits('save', name)" placeholder="pesquisar..." class="bg-transparent my-auto ml-10 sm:ml-5 outline-none w-5/6">
                <i class="mdi mdi-magnify text-black text-4xl m-auto" />
            </div>
            <div class="w-full flex justify-end mt-2 sm:mt-3">
                <span class="text-[#787878] text-end mr-2 text-sm sm:text-xs">Ultima Pesquisa:</span>
                <span @click="setName(), emits('search', name)" >
                <p class="text-[#787878] underline decoration-1 text-sm sm:text-xs hover:brightness-75 cursor-pointer">{{ supportingStore.state.nameHistory }}</p>
                </span>
            </div>
        </div>
    </ContainerGlobal>
</template>