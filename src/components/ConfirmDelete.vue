<template>
  <template>
    <div class="delete" :class="{ active: showdelete }">
      <div class="delete-wrapper">
        <div class="delete-head">
          <h3>Вы хотите удалить цитату?</h3>
          <button @click="$emit('closeConfirm')" class="delete-exit">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7.99999 6.58578L14.2929 0.292893C14.6834 -0.0976313 15.3166 -0.0976307 15.7071 0.292894C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 7.99999L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L7.99999 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976307 15.3166 -0.0976313 14.6834 0.292893 14.2929L6.58578 7.99999L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                fill="#787A80"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: "QuoteEdit",
  props: {
    showdelete: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.delete {
  position: fixed;
  top: auto;
  bottom: 100%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  z-index: 11;

  &.active {
    top: 0;
    bottom: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.7);
  }

  &-wrapper {
    background: #ffffff;
    width: 500px;
    height: 400px;
    padding: 25px 40px;
    border-radius: 20px;

    @include breakpoint(xs) {
      width: 350px;
    }

    @media screen and (max-width: 400px) {
      width: 300px;
      padding: 15px 20px;
      height: 350px;
    }
  }

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-exit {
    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>
