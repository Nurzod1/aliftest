<template>
  <div class="filter">
    <div class="filter-form">
      <div class="filter-form__wrapper">
        <div type="text" class="filter-form__search">
          <input
            class="filter-form__search-input"
            v-model="value"
            placeholder="Поиск"
            type="text"
            @keyup.enter="searchHandler()"
          />
          <button class="filter-form__search-btn" @click="searchHandler()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 30 30"
            >
              <path
                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="filter-form__select-wrapper">
          <p>Фильтр по жанру</p>
          <select class="filter-form__select" v-model="selectedGenre">
            <option class="create-form__option" value="all">Все жанры</option>
            <option
              v-for="genre in GENRES"
              :key="genre.value"
              class="create-form__option"
              :value="genre.value"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="filter-form__sort">
        <p>Сортировка:</p>
        <div class="filter-form__sort-btns">
          <button class="filter-form__sort-btn" @click="sortByUpdated">
            по дате обновления
          </button>
          <button class="filter-form__sort-btn" @click="sortByCreated">
            по дате создания
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GENRES } from "@/services/constant";

export default {
  name: "QuoteFilter",
  props: {
    genre: {
      type: String,
      default: null,
    },
    search: {
      type: String,
      default: "",
    },
    sortBy: {
      type: String,
    },
  },
  data() {
    return {
      GENRES,
      value: "",
      quotes: [],
    };
  },
  computed: {
    ...mapGetters({
      quotesList: "quotes",
      quote: "quote",
    }),
    selectedGenre: {
      get() {
        return this.genre;
      },
      set(value) {
        this.$emit("update:genre", value);
      },
    },
    selectedSort: {
      get() {
        return this.sortBy;
      },
      set(value) {
        this.$emit("update:SortBy", value);
      },
    },
  },
  watch: {
    search(newValue) {
      this.value = newValue;
    },
  },
  methods: {
    ...mapActions(["fetchQuotes"]),
    searchHandler() {
      this.$emit("searchHandler", this.value);
    },
    selectHandler(value) {
      this.$emit("update:genre", value);
    },
    sortByCreated() {
      this.sotrBy = "created";
    },
    sortByUpdated() {
      this.sotrBy = "created";
    },
  },
  mounted() {
    this.fetchQuotes();
    this.quotes = this.quotesList;
  },
};
</script>
<style lang="scss" scoped>
.filter {
  border-radius: 15px;
  padding: 20px;
  margin: 40px 0;
  background: #fceae4;

  @include breakpoint(xs) {
    margin: 10px 0 20px 0;
  }
  &-form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include breakpoint(md) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    &__wrapper {
      display: flex;
      align-items: flex-end;
      gap: 30px;
    }
    &__search {
      display: flex;
      align-items: center;
      border-radius: 10px;
      height: 30px;
      padding: 5px 4px 5px 10px;
      width: 350px;
      background: #fff;

      @include breakpoint(lg) {
        width: 250px;
      }

      @include breakpoint(md) {
        width: 100%;
      }
      &-input {
        outline: none;
        border: none;
        width: 100%;
        background: transparent;

        &::placeholder {
          color: #000;
        }
      }
      &-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: transparent;
        border: none;
        width: 30px;
        height: 25px;
        padding-right: 2px;
        cursor: pointer;
      }
    }

    &__select {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      padding: 5px 10px;
      background: #fff;
      border: none;
      margin-top: 5px;
      cursor: pointer;

      @include breakpoint(xs) {
        height: 25px;
      }

      &-wrapper {
        text-align: center;
        p {
          font-size: 12px;
        }
      }
      &-option {
      }
    }

    &__sort {
      display: flex;
      align-items: center;
      gap: 10px;

      @include breakpoint(sm) {
        gap: 5px;
      }

      @media screen and (max-width: 420px) {
        flex-direction: column;
      }
      p {
        font-size: 14px;
      }

      &-btns {
        display: flex;
        gap: 20px;

        @include breakpoint(sm) {
          gap: 10px;
        }
      }
      &-btn {
        height: 30px;
        background: transparent;
        border: none;
        cursor: pointer;

        &.active {
          color: rgb(2, 2, 209);
        }
      }
    }
  }
}
</style>
