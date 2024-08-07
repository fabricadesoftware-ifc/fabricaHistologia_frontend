<template>
    <div class="w-auto h-auto xl:flex items-center  gap-5 hidden roundbtn">
    <div class="flex container-alt">
    <div class="w-auto p-5 flex items-center bg-white h-9 rounded-l-md">
        <p class="font-poppins font-light">Clique para pesquisar uma lâmina</p>
    </div>
    <div class="w-0 h-10 altbox"></div>
    </div>
    <div class="w-20 h-20 rounded-full bg-purple-900 p-3 items-center justify-center flex">
        <img src="../assets/media/search.svg" class="w-7 h-7">
    </div>
    </div>
</template>

<style scoped>
.altbox {
    border-top:18px solid transparent;
  	border-left:18px solid rgb(255, 255, 255);
  	border-bottom:18px solid transparent;

}

.container-alt {
    opacity: 0;
    transition: 0.2s;
}

.roundbtn:hover .container-alt {
    opacity: 1;
}
</style>