<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="modal-body">
            <input v-model="key" type="password" placeholder="Input your password" />
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="emit('update:show', false)">Close</button>
              <button @click="emit('confirm', key)">Confirm</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {ref} from "vue";

const key = ref("");
const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false,
  }
);

const emit = defineEmits(['update:show','confirm']);
</script>

<style scoped>
/* Add animation on open/close modal */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

/* Modal container */
.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: all 0.3s ease;
}
.modal-container{
    background-color: white;
    padding: 12px;
    border-radius: 1rem;
}
</style>
