<script setup>
import { ref } from 'vue';
import { ContainerGlobal } from '..';
const getWidthScreenSize = ref(window.innerWidth)
</script>

<template>
    <footer class="bg-[#F9F9F9] border relative bottom-0">
        <ContainerGlobal>
            <section class="flex justify-between w-full items-center">
                <div class="sm:flex sm:items-center sm:justify-around w-2/3 sm:gap-1">
                    <img src="@/assets/images/icons/logoFabrica.png" alt="">
                    <img v-if="getWidthScreenSize > 440" src="@/assets/images/icons/ifcLogoGreen.png" class="logoIf" alt="">
                    <img v-else src="@/assets/images/icons/logoIFCmobile.png" class="ifLogoMobile">
                </div>
                <button><img src="@/assets/images/icons/imgHelp.png" class=" contrast-0 ease-out duration-150 hover:contrast-200" alt=""></button>
            </section>
        </ContainerGlobal>
    </footer>
</template>

<style scoped>
section>div{
    display: flex;
    align-items: baseline;
}
section>div>img{
    margin: 1rem;
    width: 4rem;
}
.logoIf{
    width: 170px;
}

.ifLogoMobile {
    width: 60px;
}
/* tailwind, usado os components (rebase) */
</style>