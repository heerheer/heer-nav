<script setup lang="ts">
import {ref} from "vue";
import SearchBar from "./components/search-bar.vue";
import LogoHeader from "./components/logo-header.vue";
import NavList from "./components/nav-list.vue";

const navList = ref<any>()


const updateList = (search: string) => {
  console.log("searched", search)
  navList.value.updateFilter(search)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full  py-3.5 px-6 flex justify-center items-center flex-col">
      <logo-header class="hidden sm:block"/>
      <div class="h-2.5"></div>
      <div class="w-full flex justify-center items-center">
        <search-bar @searched="updateList"/>

      </div>
      <div class="h-2.5"></div>
      <nav-list ref="navList"/>
    </div>
  </div>
</template>


<style scoped></style>
