<template>
  <div class="quote">
    <navbar />
    <div class="container">
      <div class="quote-wrapper">
        <random-quote v-if="quotesList.length > 1" />
        <h2>Цитаты</h2>
        <quote-filter
          v-model:genre="filter.genre"
          v-model:sortby="filter.sortby"
          :search="filter.search"
        />
        <template v-if="filteredQuoteList.length">
          <quote-card
            v-for="q in filteredQuoteList"
            :key="q.id"
            :id="q.id"
            :author="q.author"
            :quote="q.quote"
            :created="q.created"
            :updated="q.updated"
            @showModal="openModal(q)"
            @showModalDelete="openModalDelete(q.id)"
          />
        </template>
        <h1 v-else class="empty">Список пуст</h1>
      </div>
    </div>
    <modal-dialog v-model="showModal">
      <template #header>
        <h1>Редактировать цитату</h1>
      </template>
      <template #body>
        <form class="form" @submit.prevent="handleSubmit">
          <input class="form-input" type="text" v-model="editCard.author" />
          <textarea class="form-textarea" v-model="editCard.quote"></textarea>
          <select v-model="editCard.genre" class="form__select" required>
            <option
              v-for="genre in GENRES"
              :key="genre.value"
              class="create-form__option"
              :value="genre.value"
            >
              {{ genre.name }}
            </option>
          </select>
          <button type="submit" class="btn">Редактировать</button>
        </form>
      </template>
    </modal-dialog>
    <modal-dialog v-model="showModalDelete">
      <template #header>
        <h1>Удалить цитату</h1>
      </template>
      <template #buttons>
        <div class="buttons">
          <button class="btn red" @click="confirmDelete">Удалить</button>
          <button class="btn green" @click="cancelDelete">Отмена</button>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<script>
import QuoteCard from "@/components/QuoteCard.vue";
import QuoteFilter from "@/components/QuoteFilter.vue";
import RandomQuote from "@/components/RandomQuote.vue";
import ModalDialog from "@/components/ModalDialog/ModalDialog.vue";
import Navbar from "@/components/Navbar.vue";
import { mapGetters, mapActions } from "vuex";
import { GENRES } from "@/services/constant";
import { SORT } from "@/services/constant";
export default {
  name: "quotes-section",
  components: {
    QuoteCard,
    QuoteFilter,
    RandomQuote,
    Navbar,
    ModalDialog,
  },
  data() {
    return {
      showModal: false,
      showModalDelete: false,
      quotes: [],
      filterQuotes: [],
      quote: [],
      search: "",
      deleteQuoteId: null,
      GENRES,
      SORT,
      filter: {
        search: "",
        genre: "all",
        sortby: "created",
      },
      editCard: {
        author: "",
        quote: "",
        genre: "",
        id: null,
        updated: null,
        created: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      quotesList: "quotes",
      quote: "quote",
    }),
    filteredQuoteList() {
      const result = this.quotesList.filter((item) => {
        const qoute = item.quote.toLowerCase();
        const author = item.author.toLowerCase();
        const search = this.filter.search.toLowerCase();

        if (this.filter.genre !== "all" && item.genre !== this.filter.genre) {
          return false;
        }

        return qoute.includes(search) || author.includes(search);
      });
      return result.sort((a, b) => {
        switch (this.filter.sortby) {
          case "created":
            if (!a.created) return -1;
            return b.created - a.created;
          case "updated":
            if (!a.updated) return -1;
            return b.updated - a.updated;
        }
      });
    },
  },
  methods: {
    ...mapActions(["fetchQuotes", "deleteQuote", "updateQuote"]),
    openModal(item) {
      this.showModal = true;
      this.editCard.id = item.id;
      this.editCard.author = item.author;
      this.editCard.quote = item.quote;
      this.editCard.created = item.created;
      this.editCard.updated = item.updated;
      this.editCard.genre = item.genre;
    },
    closeModal() {
      this.showModal = false;
    },
    openModalDelete(id) {
      this.showModalDelete = true;
      this.deleteQuoteId = id;
    },
    confirmDelete() {
      this.deleteQuote(this.deleteQuoteId).then((status) => {
        if (status) this.fetchQuotes();
        this.showModalDelete = false;
      });
    },
    cancelDelete() {
      this.deleteQuoteId = null;
      this.showModalDelete = false;
    },
    closeModalDelete() {
      this.showModalDelete = false;
    },
    handleSubmit() {
      this.editCard.updated = new Date().getTime();

      this.updateQuote(this.editCard).then((status) => {
        if (status) this.fetchQuotes();
        this.showModal = false;
      });
    },
    updateSearch(search) {
      this.filter.search = search;
    },
    createSort() {},
  },
  mounted() {
    this.fetchQuotes();
    this.quotes = this.quotesList;
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &-input {
    width: 100%;
    height: 30px;
    border: 1px solid #22c8ff;
    border-radius: 10px;
    outline: none;
  }

  &-textarea {
    width: 100%;
    border: 1px solid #22c8ff;
    border-radius: 10px;
    outline: none;
    height: 160px;
  }

  input,
  textarea {
    padding: 5px 10px;
  }
}
.btn {
  width: 100%;
  height: 30px;
  background: transparent;
  border: 1px solid rgb(81, 179, 81);
  color: rgb(81, 179, 81);
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: rgb(81, 179, 81);
    color: #fff;
  }
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;

  .btn {
    padding: 10px 20px;
    display: flex;
    align-items: center;
  }

  .red {
    border-color: red;
    color: red;

    &:hover {
      background: red;
      color: #fff;
    }
  }
}
.empty {
  text-align: center;
}
</style>
