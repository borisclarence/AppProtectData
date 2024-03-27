<template>
  <div class="checkbox-component">
    <input type="checkbox" name="" id="" class="checkbox-component__input" />
    <label class="checkbox-component__label"></label>
  </div>
</template>

<script>
export default {
  name: "AppCheckbox",
};
</script>

<style lang="scss" scoped>
.checkbox-component {
  display: flex;
  position: relative;
  align-items: center;

  &__label {
    display: grid;
    position: relative;
    grid-template-columns: 2em 1fr auto;
    align-items: center;

    &::before {
      border: 1px solid #fffdff;
      border-radius: 0.25rem;
      background-color: #fffdff;
      width: 1.625rem;
      height: 1.625rem;
      content: " ";
    }
  }

  &__input {
    &:checked {
      & + label {
        &::after {
          display: block;
          position: absolute;
          border-radius: 0.25rem;
          background-color: rgb(26, 121, 116);
          width: 1.625rem;
          height: 1.625rem;
          text-align: center;
          color: #fffdff;
          font-size: 0.875rem;
          font-weight: 600;
          content: "\2713";
        }
      }
    }

    &:focus {
      & + label {
        &::before {
          box-sizing: border-box;
          border: 1px solid rgb(26, 121, 116);
          box-shadow: 0 0 2px rgba(20, 80, 197, 0.2),
            0 3px 5px rgba(20, 80, 197, 0.15);
        }
      }
    }

    &:disabled {
      & + label {
        opacity: 0.5;
      }

      &:checked {
        & + label {
          &::after {
            background-color: rgb(119, 114, 114);
          }
        }
      }
    }
  }
}
</style>
