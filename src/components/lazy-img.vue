<template>
  <div class="flex-shrink-0 flex-none">
    <img class="w-full" v-if="handleImgLoad" @load="handleImgLoad" :src="src">
    <div v-else class="w-full h-full bg-black"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const imgLoaded = ref(false);
const props = defineProps<{
  src: string
}>()
const handleImgLoad = () => {
  imgLoaded.value = true;
};

onMounted(async ()=>{
})

</script>

<style scoped>

</style>
