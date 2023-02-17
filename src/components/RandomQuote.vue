<template>
  <div v-if="item" class="random">
    <div class="random-title">
      <h1>Случайная цитата</h1>
    </div>
    <quote-card
      :author="item.author"
      :quote="item.quote"
      :genre="item.genre"
      :created="item.created"
      :updated="item.updated"
      readonly
    />
    <button class="random-btn" @click="getrandom()">
      <p>Обновить</p>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuoteCard from "@/components/QuoteCard.vue";
export default {
  components: { QuoteCard },
  data() {
    return {
      item: null,
    };
  },
  computed: {
    ...mapGetters({
      randomize: "randomize",
    }),
  },
  methods: {
    getrandom() {
      let quote = this.randomize();
      if (!quote) return null;

      while (quote.id === this.item?.id) {
        quote = this.randomize();
      }

      this.item = quote;
    },
  },
  created() {
    this.getrandom();
  },
};
</script>
<style lang="scss" scoped>
.random {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 60px;

  &-title {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;

    @include breakpoint(xs) {
      padding: 0;
      padding-top: 10px;
    }
  }

  &-btn {
    background-color: transparent;
    border: 1.5px solid #0070a0;
    border-radius: 5px;
    padding: 8px 50px;
    transition: 0.5s;
    cursor: pointer;

    @include breakpoint(xs) {
      padding: 5px 20px;
    }

    p {
      font-size: 14px;
      font-weight: 600;
      color: #0070a0;
    }
    &:hover {
      background: #0070a0;

      p {
        color: #ffffff;
      }
    }
  }

  h1 {
    @include breakpoint(xs) {
      font-size: 22px;
    }
  }
}
</style>
