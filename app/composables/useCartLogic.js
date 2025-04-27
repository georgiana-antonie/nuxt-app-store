import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';

export const useCartLogic = () => {
  const cartStore = useCartStore();

  const cartItems = computed(() => cartStore?.items ?? []);

  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  const removeFromCart = id => {
    cartStore.removeFromCart(id);
  };

  return {
    cartItems,
    totalPrice,
    removeFromCart
  };
};
