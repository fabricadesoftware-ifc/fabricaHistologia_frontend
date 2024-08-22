<script setup></script>

<template>
    <footer>
      <div>
        <img src="@/assets/media/logoFabrica.png" alt="" class="logoFabrica">
        <img src="@/assets/media/ifcLogoGreen.png" alt="">
        </div>
        <img src="@/assets/media/imgHelp.png" alt="">    
        </footer>
</template>

<style scoped>
footer>div{
    display: flex;
    align-items: baseline;
}
footer>div>img{
    margin: 1rem;
    width: 4rem;
}
footer{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-left: 10rem;
    padding-right: 10rem;
    background-color: black;
}

</style>