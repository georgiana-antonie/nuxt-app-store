<script setup>
import { useRouter } from "vue-router";
import { useCartLogic } from "~/composables/useCartLogic";

const router = useRouter();
const { cartItems, totalPrice, removeFromCart } = useCartLogic();

const checkout = () => {
  router.push("/checkout");
};
</script>

<template>
  <aside class="w-72 bg-gray-100 border-l border-gray-300 p-4">
    <h2 class="text-lg dark:text-black font-semibold mb-4">Shopping Basket</h2>
    <hr class="mb-4" />

    <div v-if="cartItems && cartItems.length > 0">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between gap-4 mb-4 border-b pb-4"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-16 h-16 object-cover rounded-lg"
        />
        <div class="flex-1">
          <h3 class="text-md dark:text-black font-semibold flex-1">
            {{ item.title }}
          </h3>
          <div
            class="flex justify-between items-center text-sm text-gray-500 font-semibold"
          >
            <UButton
              icon="i-lucide-trash"
              size="xs"
              color="neutral"
              @click="removeFromCart(item.id)"
            />
            <span v-if="item.quantity > 1"> {{ item.quantity }} pcs. </span>
            <p class="text-sm dark:text-black text-gray-500 font-semibold">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-between dark:text-black text-lg font-semibold">
        <span>Total</span>
        <span>${{ totalPrice }}</span>
      </div>

      <UButton
        class="mt-4 w-full justify-center"
        icon="i-lucide-send"
        size="md"
        color="primary"
        variant="solid"
        @click="checkout"
      >
        Checkout
      </UButton>
    </div>

    <div v-else class="text-center text-gray-800">Your cart is empty</div>
  </aside>
</template>
