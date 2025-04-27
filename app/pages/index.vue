<script setup>
import ProductList from "~/components/ProductList.vue";

useHead({
  title: "Home",
});
</script>

<template>
  <div class="container mx-auto p-6">
    <ProductList />
  </div>
</template>
