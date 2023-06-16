<template>
    <div v-if="show" class="modal-mask backdrop-blur-md bg-opacity-60">
      <div class="modal-wrapper bg-white rounded-lg shadow-2xl">
        <div class="modal-container">
          <div class="modal-header px-4 py-2 border-b border-gray-200">
            <slot name="header">输入校验密码</slot>
          </div>

          <div class="modal-body p-4">
            <input v-model="key" type="password" class="w-full p-2 border border-gray-300 rounded"
                   placeholder="Input your password"/>
          </div>

          <div class="modal-footer flex items-center justify-end px-4 py-3 border-t border-gray-200">
            <slot name="footer">
              <button @click="emit('update:show', false)"
                      class="px-4 py-2 mr-4 text-sm text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-100">
                Close
              </button>
              <button @click="emit('confirm', key)"
                      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded hover:bg-blue-700">
                Confirm
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
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

const emit = defineEmits(['update:show', 'confirm']);
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

.modal-container {
  background-color: white;
  padding: 12px;
  border-radius: 1rem;
}
</style>
