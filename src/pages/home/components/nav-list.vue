<template>
  <div class="flex flex-col gap-4.5 w-full px-2.5">
    <div v-for="item in list" :key="item.category" class="mb-2.5">
      <div class="flex flex-col">
        <div class="text-black font-bold text-opacity-40 mb-2.5">
          {{ item.category }}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="site in item.sites">
            <div
              class="hover:bg-white hover:shadow rounded-lg h-24 hover:cursor-pointer"
              @click="openNewPage(site.url, site)"
            >
              <div class="w-full h-full p-3.5 flex items-center">
                <lazy-img
                  class="w-14"
                  :src="
                    'http://www.google.com/s2/favicons?sz=64&domain=' + site.url
                  "
                >
                </lazy-img>
                <div class="ml-3.5 h-full flex-1">
                  <div class="flex flex-col space-start">
                    <div class="flex-1 flex justify-between items-center">
                      <div class="text-indigo-700">{{ site.name }}</div>
                      <div
                        v-if="site.encrypted"
                        class="bg-yellow-400 h-full px-2 text-center rounded-md text-sm"
                      >
                        Encrypetd
                      </div>
                    </div>
                    <div
                      class="text-indigo-700 text-xs opacity-60 overflow-hidden overflow-ellipsis"
                    >
                      {{ site.desc }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="list.length <= 0">
      <div class="w-full flex-col flex items-center justify-center">
        <Cat class="mt-3.5 max-w-[300px]" />
        <div class="text-xl text-indigo-600">
          You're in a wasteland without data!
        </div>
      </div>
    </div>
  </div>

  <modal v-model:show="show" @confirm="modal_confirm" />
</template>

<script setup lang="ts">
import data from "@/assets/list.json";
import { NavCategory, NavSite } from "@/types";
import LazyImg from "@/components/lazy-img.vue";
import modal from "../components/modal.vue";
import { reactive, ref } from "vue";
import Cat from "@/components/illustration/Cat.vue";
import { AES ,enc} from "crypto-ts";

const show = ref(false);

let modal_confirm = (key:string) => {};

const list = ref<NavCategory[]>([]);
list.value = JSON.parse(JSON.stringify(data as NavCategory[]));

const getDomain = (url: string) => {
  return url.replace(/^https?:\/\/([^/?#]+).*$/, "$1");
};

const openNewPage = (url: string, site: NavSite) => {
  if (url.startsWith("http")) {
    window.open(url, "_blank");
  } else if (url.startsWith("/")) {
    show.value = true;
    let encrypted_url = site.encrypted_url!;
    modal_confirm = (key:string) => {
      let de_url = AES.decrypt(encrypted_url, key).toString(enc.Utf8)
      console.log(encrypted_url)
      console.log(de_url)
      if (de_url.startsWith("http")) {
        window.open(de_url, "_blank");
      }
    };
  }
};

const updateFilter = (search: string) => {
  if (search == "" || search == undefined) {
    list.value = data as NavCategory[];
    return;
  } else {
    list.value = searchNavCategories(data, search);
  }
};

function searchNavCategories(
  data: NavCategory[],
  search: string
): NavCategory[] {
  const result: NavCategory[] = [];
  search = search.toLowerCase();

  data.forEach((category) => {
    const navSites: NavSite[] = [];
    category.sites.forEach((site) => {
      if (site.name.toLowerCase().includes(search)) {
        navSites.push(site);
      } else if (site.desc.toLowerCase().includes(search)) {
        navSites.push(site);
      }
    });

    if (
      category.category.toLowerCase().includes(search) ||
      navSites.length > 0
    ) {
      result.push({
        category: category.category,
        tags: category.tags,
        sites: navSites,
      });
    }
  });

  return result;
}

defineExpose({
  updateFilter,
});
</script>

<style scoped></style>
