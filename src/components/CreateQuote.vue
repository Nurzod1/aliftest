<template>
  <div class="create">
    <div class="container">
      <div class="create-page__wrapper">
        <div class="create-page__title">
          <h1>Cоздать цитату</h1>
        </div>
        <div class="create-form__wrapper">
          <form class="create-form" @submit.prevent="handleSubmit">
            <input
              class="create-form__input"
              v-model.trim="form.author"
              type="text"
              placeholder="Автор"
              required
            />
            <textarea
              class="create-form__input"
              v-model="form.quote"
              type="text"
              placeholder="Введите цитату"
              required
            />
            <select v-model="form.genre" class="create-form__select" required>
              <option
                v-for="genre in GENRES"
                :key="genre.value"
                class="create-form__option"
                :value="genre.value"
              >
                {{ genre.name }}
              </option>
            </select>
            <button class="create-form__btn" type="submit">
              <p>Создать</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GENRES } from "@/services/constant";

export default {
  name: "CreateQuote",
  data() {
    return {
      GENRES,
      form: {
        author: "",
        quote: "",
        genre: GENRES[0].value,
        created: null,
        updated: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.form.created = new Date().getTime();
      this.$emit("form:submit", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.create {
  &-page {
    &__wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;
      margin-top: 60px;
    }

    &__title {
      display: flex;
      justify-content: center;
      padding: 10px 0;

      h1 {
        @include breakpoint(xs) {
          font-size: 20px;
        }
      }
    }
  }

  &-form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__wrapper {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 5px;
      padding: 20px;
      align-items: center;
      margin-top: 60px;
    }

    &__input {
      &:nth-child(2) {
        width: 400px;
        height: 70px;

        @include breakpoint(sm) {
          width: 300px;
          height: 60px;
        }

        @media screen and (max-width: 400px) {
          width: 250px;
        }
      }
    }

    &__select {
      cursor: pointer;
      background: transparent;
    }

    &__btn {
      background: #0070a0;
      padding: 7px 10px !important;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: #0070a0d6;
      }

      p {
        color: #fff;
      }
    }

    input,
    textarea,
    select,
    button {
      outline: none;
      border: 1px solid #0070a0;
      border-radius: 5px;
      padding: 5px 8px;
    }
  }
}
</style>
