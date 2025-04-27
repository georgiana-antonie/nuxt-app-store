<script setup>
import { useCartStore } from "@/stores/cart";
import { ref, computed } from "vue";

useHead({
  title: "Checkout",
});

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() =>
  cartItems.value
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
);

const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const placeOrder = async () => {
  isSubmitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        items: cartItems.value,
        total: totalPrice.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) throw new Error("Error sending order");

    const data = await response.json();
    console.log("Server response:", data);

    cartStore.clearCart();
    successMessage.value = "The order was placed successfully";
  } catch (err) {
    errorMessage.value = "ERROR! Please try again later";
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl dark:text-black font-bold mb-4">Complete your order</h1>

    <div v-if="cartItems.length > 0">
      <ul class="dark:text-black divide-y mb-4">
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="py-2 flex justify-between"
        >
          <span>{{ item.title }} (x{{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>

      <div
        class="dark:text-black flex justify-between font-semibold text-lg mb-4"
      >
        <span>Total:</span>
        <span>${{ totalPrice }}</span>
      </div>

      <UButton
        :loading="isSubmitting"
        class="w-full"
        color="primary"
        icon="i-lucide-credit-card"
        @click="placeOrder"
      >
        Pay
      </UButton>

      <p v-if="successMessage" class="mt-4 text-green-600 font-medium">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="mt-4 text-red-600 font-medium">
        {{ errorMessage }}
      </p>
    </div>

    <div v-else class="text-gray-500 text-center">Your cart is empty.</div>
  </div>
</template>
