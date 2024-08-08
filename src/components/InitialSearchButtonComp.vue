<template>
  <div class="w-auto h-auto xl:flex items-center gap-5 hidden">
    <div class="w-20 h-20 rounded-full bg-purple-900 p-3 items-center justify-center flex roundbtn">
      <img src="../assets/media/search.svg" class="w-7 h-7" />
      <div class="flex container-alt absolute w-96 right-10">
        <div class="w-auto p-5 flex items-center bg-white h-9 rounded-l-md">
          <p class="font-poppins font-light">Clique para pesquisar uma lâmina</p>
        </div>
        <div class="w-0 h-10 altbox"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.altbox {
  border-top: 18px solid transparent;
  border-left: 18px solid rgb(255, 255, 255);
  border-bottom: 18px solid transparent;
}

.container-alt {
  opacity: 0;
  transition: 0.2s;
  visibility: hidden;
}

.roundbtn:hover .container-alt {
  opacity: 1;
  visibility: visible;
}
</style>
