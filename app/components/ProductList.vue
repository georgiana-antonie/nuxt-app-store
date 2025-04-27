<script setup>
import { ref, computed, watch, defineAsyncComponent } from "vue";
import PriceRangeSlider from "@/components/PriceRangeSlider.vue";

const productStore = useProductStore();

const ProductCard = defineAsyncComponent(
  () => import("@/components/ProductCard.vue")
);

const { data: products } = await useFetch("https://fakestoreapi.com/products");

const priceRange = ref([0, 0]);
const sortOption = ref("asc");

const allPrices = computed(() => products.value?.map((p) => p.price) || []);
const minPrice = computed(
  () => Math.floor(Math.min(...allPrices.value) / 10) * 10
);
const maxPrice = computed(
  () => Math.ceil(Math.max(...allPrices.value) / 10) * 10
);

watch(
  () => [minPrice.value, maxPrice.value],
  ([min, max]) => {
    if (priceRange.value[0] === 0 && priceRange.value[1] === 0) {
      priceRange.value = [min, max];
    }
  },
  { immediate: true }
);

const filteredProducts = computed(() => {
  if (!products.value) return [];

  const filtered = products.value.filter(
    (product) =>
      product.title
        .toLowerCase()
        .includes(productStore.searchQuery.toLowerCase()) &&
      product.price >= priceRange.value[0] &&
      product.price <= priceRange.value[1]
  );

  return filtered.sort((a, b) =>
    sortOption.value === "asc" ? a.price - b.price : b.price - a.price
  );
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Products</h1>

    <div
      class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div class="flex items-center gap-4 flex-1">
        <span class="text-sm dark:text-white text-gray-700 whitespace-nowrap"
          >$ {{ priceRange[0] }}</span
        >
        <PriceRangeSlider
          v-if="products"
          v-model="priceRange"
          :min="minPrice"
          :max="maxPrice"
          class="flex-1 max-w-[700px]"
        />
        <span class="text-sm dark:text-white text-gray-700 whitespace-nowrap"
          >$ {{ priceRange[1] }}</span
        >
      </div>

      <div class="flex-shrink-0">
        <label for="sort-select" class="text-sm font-medium mr-2"
          >Sort by:</label
        >
        <select
          id="sort-select"
          v-model="sortOption"
          class="border rounded px-2 py-1 text-sm"
        >
          <option value="asc" class="dark:text-black">prices ascending</option>
          <option value="desc" class="dark:text-black">
            prices descending
          </option>
        </select>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <component
        :is="ProductCard"
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
