<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  min: Number,
  max: Number,
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = [...newVal];
  }
);

function updateRange(index, event) {
  const newVal = [...localValue.value];
  newVal[index] = Number(event.target.value);

  if (newVal[0] > newVal[1]) {
    if (index === 0) newVal[1] = newVal[0];
    else newVal[0] = newVal[1];
  }
  localValue.value = newVal;
  emit("update:modelValue", newVal);
}

const activeTrackLeft = computed(
  () => ((localValue.value[0] - props.min) / (props.max - props.min)) * 100
);

const activeTrackWidth = computed(
  () =>
    ((localValue.value[1] - localValue.value[0]) / (props.max - props.min)) *
    100
);
</script>

<template>
  <div class="relative w-full">
    <div
      class="h-1 bg-gray-300 rounded absolute top-1/2 transform -translate-y-1/2 w-full"
    />

    <div
      class="h-1 bg-sky-900 rounded absolute top-1/2 transform -translate-y-1/2"
      :style="{
        left: `${activeTrackLeft}%`,
        width: `${activeTrackWidth}%`,
      }"
    />

    <input
      type="range"
      :min="min"
      :max="max"
      step="10"
      :value="localValue[0]"
      class="slider-thumb"
      aria-label="Minimum price"
      @input="updateRange(0, $event)"
    >
    <input
      type="range"
      :min="min"
      :max="max"
      step="10"
      :value="localValue[1]"
      class="slider-thumb"
      aria-label="Maximum price"
      @input="updateRange(1, $event)"
    >
  </div>
</template>

<style scoped>
.slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: none;
  position: absolute;
  top: 0;
  pointer-events: none;
}

.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 9999px;
  background: #13507c;
  cursor: pointer;
  pointer-events: auto;
  border: 1px solid white;
  box-shadow: 0 0 0 2px #13507c;
  margin-top: -0.5rem;
}
</style>
