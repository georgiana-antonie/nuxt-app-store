import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const addToCart = product => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = productId => {
    const itemIndex = items.value.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      const item = items.value[itemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        items.value.splice(itemIndex, 1);
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return { items, addToCart, removeFromCart, clearCart };
});
