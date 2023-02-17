<script setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  useSlots,
  watch,
} from "vue";

const props = defineProps({
  modelValue: Boolean,
  size: {
    type: String,
    validator(value) {
      return ["large", "medium", "small"].includes(value);
    },
    default: "small",
  },
});

const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();

const isButtonsSlotExist = computed(() => {
  return !!slots.buttons;
});

function closeModal() {
  emit("update:modelValue", false);
}

function disableScroll() {
  const htmlEl = document.querySelector("html");
  if (props.modelValue) {
    htmlEl.classList.add("disabledY");
  } else {
    htmlEl.classList.remove("disabledY");
    htmlEl.style.paddingRight = "";
  }
}

watch(
  () => props.modelValue,
  () => {
    disableScroll();
  }
);

onMounted(() => {
  disableScroll();
});
</script>

<template>
  <transition name="modal">
    <div v-show="modelValue" :class="['modal', `modal--size-${size}`]">
      <div class="modal__overlay" @click="closeModal()" />
      <div class="modal__wrapper">
        <div class="modal__window">
          <div class="modal__header">
            <slot name="header" />
            <button class="modal__close" @click="closeModal()">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15"
                  stroke="#AAAAAA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 5L15 15"
                  stroke="#AAAAAA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            :class="[
              'modal__body',
              {
                'modal__body--no-padding': !isButtonsSlotExist,
              },
            ]"
          >
            <slot name="body" />
          </div>
          <div v-if="isButtonsSlotExist" class="modal__buttons">
            <slot name="buttons" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="./ModalDialog.scss" />
