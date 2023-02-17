<template>
  <div @click="$router.push(`/quote/${id}`)" class="quote">
    <div class="quote-head">
      <div class="quote-head__about">
        <p class="quote-head__about-autor">{{ author }}</p>
        <div class="quote-head__about-date">
          <p>Дата coздания:</p>
          <p>
            {{ createdDate }}
          </p>
        </div>
      </div>
      <div v-if="!readonly" class="quote-head__btns">
        <button
          class="quote-head__btns-item edit"
          @click.stop="$emit('showModal')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0,0,256,256"
          >
            <g
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(5.12,5.12)">
                <path
                  fill="currentColor"
                  d="M46.57422,3.42578c-0.94922,-0.94922 -2.19531,-1.42578 -3.44141,-1.42578c-1.24609,0 -2.49219,0.47656 -3.44141,1.42578c0,0 -0.07031,0.06641 -0.16016,0.16016c-0.00781,0.00781 -0.01953,0.01172 -0.02734,0.01953l-35.20312,35.19922c-0.12109,0.125 -0.21094,0.27734 -0.25781,0.44922l-2.00781,7.48828c-0.09375,0.34375 0.00391,0.71094 0.25781,0.96484c0.19141,0.19141 0.44531,0.29297 0.70703,0.29297c0.08594,0 0.17188,-0.01172 0.25781,-0.03516l7.48828,-2.00781c0.17188,-0.04687 0.32422,-0.13672 0.44922,-0.26172l35.19922,-35.19531c0.01172,-0.01172 0.01563,-0.02734 0.02344,-0.03906c0.08984,-0.08984 0.15234,-0.15234 0.15234,-0.15234c1.90625,-1.90234 1.90625,-4.98437 0.00391,-6.88281zM45.16016,4.83984c1.11719,1.11719 1.11719,2.9375 0,4.05469c-0.33203,0.32813 -0.61328,0.61328 -0.85547,0.85547l-4.05469,-4.05469c0.46094,-0.46094 0.85547,-0.85547 0.85547,-0.85547c0.53906,-0.54297 1.26172,-0.83984 2.02734,-0.83984c0.76563,0 1.48438,0.30078 2.02734,0.83984zM5.60547,41.15234l3.24219,3.24219l-4.43359,1.19141z"
                ></path>
              </g>
            </g>
          </svg>
        </button>
        <button
          class="quote-head__btns-item delete"
          @click.stop="$emit('showModalDelete')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0,0,256,256"
          >
            <g
              fill-opacity="1"
              fill="rgb(237, 102, 102)"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(10.66667,10.66667)">
                <path
                  fill="currentColor"
                  d="M10,2l-1,1h-5v2h1v15c0,0.52222 0.19133,1.05461 0.56836,1.43164c0.37703,0.37703 0.90942,0.56836 1.43164,0.56836h10c0.52222,0 1.05461,-0.19133 1.43164,-0.56836c0.37703,-0.37703 0.56836,-0.90942 0.56836,-1.43164v-15h1v-2h-5l-1,-1zM7,5h10v15h-10zM9,7v11h2v-11zM13,7v11h2v-11z"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div class="quote-main">
      <p>
        {{ quote }}
      </p>
    </div>
    <div v-if="updatedDate" class="quote-foot">
      <div class="quote-foot__date">
        <p>Дата последнего обновления:</p>
        <p>{{ updatedDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuoteCard",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    created: {
      type: String,
    },
    updated: {
      type: String,
    },
    id: {
      type: Number,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
      showModalDelete: false,
    };
  },
  computed: {
    createdDate() {
      if (!this.created) return null;

      return this.dateFormatter(this.created);
    },
    updatedDate() {
      if (!this.updated) return null;

      return this.dateFormatter(this.updated);
    },
  },
  methods: {
    dateFormatter(date) {
      const created = new Date(date);
      const day = ("0" + created.getDate()).slice(-2);
      const month = ("0" + (created.getMonth() + 1)).slice(-2);
      const year = created.getFullYear();
      const hour = created.getHours();
      const minute = created.getMinutes();

      return `${day}-${month}-${year}г ${hour}:${minute}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.quote {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  background-color: #cef0fb;
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 20px;
  transition: 0.2s ease;
  cursor: pointer;

  @include breakpoint(xs) {
    margin: 10px 0;
  }

  &:hover {
    box-shadow: -5px 5px 10px rgba($color: #000000, $alpha: 0.2);
    transform: translate(5px, -5px);

    @include breakpoint(xs) {
      box-shadow: none;
      transform: none;
    }
  }

  &-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    @include breakpoint(xs) {
      margin-bottom: 0px;
    }

    &__about {
      &-autor {
        font-size: 24px;
        font-weight: 600;

        @include breakpoint(xs) {
          font-size: 20px;
        }
      }

      &-date {
        display: flex;
        gap: 5px;
        font-size: 14px;
        font-weight: 600;

        @include breakpoint(xs) {
          font-size: 12px;
        }
      }
    }

    &__btns {
      display: flex;
      gap: 10px;

      &-item {
        --editColor: rgb(81, 179, 81);
        --deleteColor: rgb(237, 102, 102);

        display: flex;
        width: 30px;
        height: 30px;
        background: transparent;
        border-radius: 10px;
        padding: 7px;
        cursor: pointer;
        transition: 0.3s;

        &.edit {
          border: 1px solid var(--editColor);

          &:hover {
            background: var(--editColor);

            svg {
              color: white;
            }
          }

          svg {
            color: var(--editColor);
          }
        }

        &.delete {
          border: 1px solid var(--deleteColor);

          &:hover {
            background: var(--deleteColor);

            svg {
              color: white;
            }
          }

          svg {
            color: var(--deleteColor);
          }
        }

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &-main {
    margin: 10px 0;
    letter-spacing: 0.2px;
  }

  &-foot {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    &__date {
      display: flex;
      gap: 5px;
      font-size: 12px;
    }
  }
}
</style>
