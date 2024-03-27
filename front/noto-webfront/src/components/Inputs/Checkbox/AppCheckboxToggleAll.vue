<template>
  <div class="checkboxToggleAll">
    <input
      type="checkbox"
      class="demo5"
      id="demo5"
      @click="selectAllCategories"
      :checked="isAllSelectedCategories"
    />
    <label for="demo5"></label>

    <div class="checkboxToggleAll-details">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCheckboxToggleAll",

  props: {
    isAllSelectedCategories: {
      type: Boolean,
      require: true,
    },
  },

  methods: {
    selectAllCategories(event) {
      this.$emit("checkAllCategories", event);
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="checkbox"].demo5 {
  display: none;
}
input[type="checkbox"].demo5 + label {
  box-sizing: border-box;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  padding: 2px;
  background-color: #c0ceda;
  transition: all 0.5s;
  margin-right: 0.5rem;
}
input[type="checkbox"].demo5 + label::before {
  box-sizing: border-box;
  display: block;
  content: "";
  height: calc(1.5rem - 4px);
  width: calc(1.5rem - 4px);
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.5s;
}
input[type="checkbox"].demo5:checked + label {
  background-color: #5b88da;
}
input[type="checkbox"].demo5:checked + label::before {
  margin-left: 1.5rem;
}

.checkboxToggleAll {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &-details {
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    font-family: "Gudea", sans-serif;
    font-size: 14px;
  }
}
</style>
