<template>
  <div class="quote">
    <navbar />
    <div class="container">
      <quote-review />
    </div>
  </div>
</template>

<script>
import QuoteReview from "@/components/QuoteReview.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Quote-View",
  components: { QuoteReview, Navbar },
};
</script>

<style lang="scss" scoped></style>
