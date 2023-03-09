<template>
  <div class="relative w-full rounded-lg shadow-md max-w-[400px]">
    <input
        v-model="searchContent"
        class="flex h-12 w-full rounded-lg placeholder:opacity-80 outline-none 
        min-w-[100px] px-3.5 py-2.5 
        focus:placeholder:opacity-30 focus:ring-2 focus:ring-indigo-400
        hide-on-hover-and-focus"
        placeholder="type what you want to search"
        @keydown.enter="handleEnter"

    />
    <div class="absolute top-0 right-0 h-full">
      <div class="flex h-full items-center justify-center pr-2.5">
        <svg
            id="search-icon"
            class="h-4 w-4 fill-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
          <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
        <div id="enter-search" class="hidden p-1.5  rounded border-2 border-gray-400 text-gray-400 text-xs text-center">
          <div class="flex flex-row items-center gap-1.5">
            <svg class="w-3 h-3"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                 xml:space="preserve"><path fill="#666" d="M137 407 l-128 -128 q-9 -10 -9 -23 q0 -13 9 -23 l128 -127 q10 -9 23 -9 q13 0 23 9 q9 10 9 23 q0 13 -9 23 l-74 72 l323 0 q15 -1 16 -16 l0 -176 q0 -14 9 -23 q9 -9 23 -9 q14 0 23 9 q9 9 9 23 l0 176 q-1 34 -23 57 q-23 22 -57 23 l-323 0 l74 73 q9 10 9 22 q0 12 -9 23 q-10 10 -23 10 q-13 0 -23 -9 l0 0 Z"/></svg>
            <div>
              ENTER
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import {ref} from "vue";

const emits = defineEmits(['searched'])
const searchContent = ref('')
const handleEnter = () => {
  //console.log('Enter key pressed');

  //do search
  emits('searched', searchContent.value)

};
</script>

<style scoped>
.hide-on-hover-and-focus:focus + div #search-icon {
  display: none;
}

.hide-on-hover-and-focus:focus + div #enter-search {
  display: block;
}

</style>
