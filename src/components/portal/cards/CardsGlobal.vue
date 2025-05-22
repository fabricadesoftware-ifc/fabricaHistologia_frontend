<script setup>
import { onMounted, reactive, watch } from 'vue';
import { CardsContainer, SmallCardDefault } from '@/components';

const props = defineProps({
    datas: {
        type: Array,
        required: true,
    },
    context: {
        type: String,
        required: false,
        default: 'system'
    },
    justify: {
        type: String,
        default: 'justify-center'  
    },
    gap: {
        type: String,
        default: 'gap-10'
    },
    analisys_datas: {
        type: Array,
        default: []
    }
})

const counts = reactive({})

const filterAnalises = async () => {
    for (const item of props.analisys_datas) {
        counts[item.id] = item.data.length
    }
}

watch(() => props.analisys_datas, filterAnalises, {immediate: true, deep: true})

onMounted(async ()=> {
      await filterAnalises()
})
</script>

<template>
    <CardsContainer :gap="props.gap" :justify="props.justify"> 
        <SmallCardDefault :count="counts[i.id] ?? 'carregando'" v-for="i in props.datas" :key="i.name" :item="i" :context="context" />
    </CardsContainer>
</template>