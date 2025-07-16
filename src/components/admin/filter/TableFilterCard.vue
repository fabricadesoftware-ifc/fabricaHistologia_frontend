    <script setup>
    import { onMounted } from 'vue';

    const props = defineProps({
        active: {
            type: Boolean,
            default: false
        },
        filter: {
            type: Object
        }
    })

    const emits = defineEmits([
        'change'
    ])

    </script>
    <template>
        <div @click="emits('change')" :class="`inline-flex flex-nowrap w-auto max-w-64 px-8 py-2 select-none gap-3 rounded-full relative items-center justify-center hover:bg-[#29AC96]/30 duration-150 cursor-pointer ${ props.active ? 'bg-[#29AC96]/30' : ''}`">
            
            <img class="w-[25px] h-[25px]" :src="props.filter.image" > 
            <p class="whitespace-nowrap">{{ props.filter.nome }}</p>
        </div>
    </template>