<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const productStore = useProductStore();
</script>

<template>
  <header class="bg-sky-900 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold cursor-pointer" @click="goHome">
      NuxtApp Store
    </h1>
    <UInput
      v-model="productStore.searchQuery"
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="Search..."
    />
  </header>
</template>
