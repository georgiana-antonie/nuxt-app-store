<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col justify-between"
  >
    <img
      :src="product.image"
      :alt="product.title"
      class="h-48 w-full object-contain mb-4"
      loading="lazy"
    >
    <h2 class="font-semibold dark:text-black text-base text-center mb-4 line-clamp-2">
      {{ product.title }}
    </h2>
    <div class="flex justify-between items-center mt-auto">
      <UButton
        class="cursor-pointer"
        icon="i-lucide-shopping-cart"
        color="neutral"
        variant="outline"
        :ui="{ leadingIcon: 'text-primary' }"
        @click="addToCart(product)"
      >
        Add to cart
      </UButton>
      <div class="text-green-600 font-bold text-xl">${{ product.price }}</div>
    </div>
  </div>
</template>
