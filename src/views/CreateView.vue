<template>
  <div class="create-page">
    <navbar />
    <create-quote @form:submit="addQuote" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CreateQuote from "@/components/CreateQuote.vue";
import { mapActions } from "vuex";
export default {
  name: "CreateView",
  components: { Navbar, CreateQuote },
  methods: {
    ...mapActions(["postQuote"]),
    async addQuote(form) {
      return await this.postQuote({
        author: form.author,
        quote: form.quote,
        genre: form.genre,
        created: form.created,
        updated: form.updated,
      }).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
