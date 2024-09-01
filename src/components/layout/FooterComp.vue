<script setup>
import { ContainerGlobal } from '..';

</script>

<template>
    <footer class="bg-[#F9F9F9]">
        <ContainerGlobal>
            <section class="flex justify-between items-center">
                <div>
                    <img src="@/assets/images/icons/logoFabrica.png" alt="">
                    <img src="@/assets/images/icons/ifcLogoGreen.png" class="logoIf" alt="">
                </div>
                <img src="@/assets/images/icons/imgHelp.png" class="w-8 h-8" alt="">    
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
/* tailwind, usado os components (rebase) */
</style>