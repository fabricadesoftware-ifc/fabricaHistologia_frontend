<script setup>
import router, {toBackPage} from '@/router';

const props = defineProps({
    tittle: {
        type: String,
        required: true
    }
})

</script>
<template>
    <span class="box-back-btn" @click="toBackPage()">
        <button class="back-btn" name="back-btn"> <img src="../assets/media/right-arrow.svg"></button>
        <label for="back-btn" class="label-back-btn">{{ props.tittle }}</label>
    </span>
</template>

<style scoped>
.box-back-btn {
    display: flex;
    gap: 5px;
    height: 20px;
    width: auto;
    position: absolute;
    margin: 35px 0 0 170px;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-family: var(--font-poppins);
    transition: 0.2s;
    cursor: pointer;
    z-index: 30;
    &:hover {
        gap: 10px;
    }
}

.label-back-btn {
    font-weight: 500;
    cursor: pointer;
}


.back-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    & img {
        width: 15px;
        height: 15px;
    }
}
</style>
