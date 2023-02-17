<template>
  <div class="quote">
    <div class="quote-head">
      <div class="quote-head__about">
        <p class="quote-head__about-autor">Аристотель</p>
        <div class="quote-head__about-date">
          <p>Дата coздания:</p>
          <p>19.10.2022г.</p>
        </div>
        <div class="quote-head__about-genre">
          <p>Жанр:</p>
          <p>Доброта</p>
        </div>
      </div>
    </div>
    <div class="quote-main">
      <p>
        Свойство добродетели состоит, скорее, в том, чтобы делать добро, а не
        принимать его, и в том, чтобы совершать прекрасные поступки, более, чем
        в том, чтобы не совершать постыдных.
      </p>
    </div>
    <div class="quote-foot">
      <div class="quote-foot__date">
        <p>Дата последнего обновления:</p>
        <p>10.01.2023г.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuoteReview",
};
</script>
<style lang="scss" scoped>
.quote {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px;
  margin: 20px 0;
  transition: 0.2s ease;
  margin-top: 60px;

  &-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

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

        @include breakpoint(sm) {
          flex-direction: column;
          gap: 0;
        }

        @include breakpoint(xs) {
          font-size: 12px;
        }
      }

      &-genre {
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
        gap: 10px;
        align-items: center;
        background: transparent;
        border-radius: 10px;
        padding: 7px;
        height: 30px;
        cursor: pointer;
        transition: 0.3s;

        @include breakpoint(sm) {
          width: 30px;
          height: 30px;
        }

        &.edit {
          border: 1px solid var(--editColor);

          p {
            color: var(--editColor);

            @include breakpoint(sm) {
              display: none;
            }
          }

          &:hover {
            background: var(--editColor);

            svg {
              color: white;
            }

            p {
              color: #fff;
            }
          }

          svg {
            color: var(--editColor);
          }
        }

        &.delete {
          border: 1px solid var(--deleteColor);

          p {
            color: var(--deleteColor);

            @include breakpoint(sm) {
              display: none;
            }
          }

          &:hover {
            background: var(--deleteColor);

            svg {
              color: white;
            }

            p {
              color: #fff;
            }
          }

          svg {
            color: var(--deleteColor);
          }
        }
      }
    }
  }

  &-main {
    margin: 10px 0;
    letter-spacing: 0.2px;

    @include breakpoint(xs) {
      font-size: 14px;
      letter-spacing: 0;
    }
  }

  &-foot {
    margin-top: 10px;

    &__date {
      display: flex;
      gap: 5px;
      font-size: 12px;

      @include breakpoint(sm) {
        font-size: 10px;
      }
    }
  }
}
</style>
