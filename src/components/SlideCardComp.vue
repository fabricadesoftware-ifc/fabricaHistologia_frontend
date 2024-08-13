<script setup>
const props = defineProps({
    details: {
        type: Object
    }
})
</script>
<template>
    <div class="w-1/5  xl:w-2/6 md:w-3/6 sm:w-5/6 h-80 flex justify-center" v-for="(items, index) in props.details" :key="index">
    <div class="group/container w-52 h-64 flex flex-col rounded-2xl shadow-lg duration-200 ease-out hover:shadow-xl cursor-default">
        <div class="w-full h-3/6 rounded-t-xl">
            <img src="../assets/media/cellImg.jpg" class="rounded-t-2xl" alt="">
        </div>
        <div class="group/boxtext w-full h-3/6 flex flex-col rounded-b-xl bg-white p-3 group-hover/container:bg-zinc-100">
            <div class="w-full h-2/6 flex items-center">
                <ul class="flex list-none w-full justify-around text-white font-poppins text-xs">
                    <li v-for="(item, index) in items.tags" :key="index" :class="`${item.background} ${item.color}  px-3 py-1 rounded-lg`"><p>{{ item.content }}</p></li>
                </ul>
            </div>
            <div class="w-full h-4/6 flex flex-col items-center justify-evenly font-poppins text-center">
                <div class="w-full overflow-x-hidden overflow-y-hidden">
                <p class="font-normal text-xl mb-2">{{items.name}}</p>
                </div>
                <p class="text-sm italic text-slate-600">{{items.date[0]}} de {{items.date[1]}} de {{items.date[2]}}</p>
            </div>
        </div>
    </div>
    </div>
</template>