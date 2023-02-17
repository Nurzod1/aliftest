<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-links">
        <router-link to="/" class="navbar-links__item">
          <p>Список цитат</p>
        </router-link>
        <router-link to="/CreateView" class="navbar-links__item">
          <p>Создание цитаты</p>
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "main-navbar",
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #0070a0;
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  &-links {
    display: flex;
    justify-content: center;
    gap: 40px;

    &__item {
      font-family: Inter;
      font-size: 14px;
      color: #fff;
      text-decoration: none;
      transition: 0.3s;
      &:hover {
        letter-spacing: 0.3px;
      }
    }
  }
}
</style>
