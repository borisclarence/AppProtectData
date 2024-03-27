<template>
  <div class="checkboxToggleChild">
    <input
      type="checkbox"
      :id="`${idCheckbox}`"
      @click="selectCategory"
      :checked="isSelectedCategory"
    />
    <label :for="`${idCheckbox}`"></label>

    <div class="checkboxToggleChild-details">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCheckboxToggleChild",

  props: {
    isSelectedCategory: {
      type: Boolean,
      require: true,
    },
    idCheckbox: {
      type: Number,
      require: true,
    },
  },

  methods: {
    selectCategory(event) {
      this.$emit("checkCategory", event);
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  box-sizing: border-box;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  padding: 2px;
  background-color: #ffffff;
  transition: all 0.5s;
  margin-right: 0.5rem;
}
input[type="checkbox"] + label::before {
  box-sizing: border-box;
  display: block;
  content: "";
  height: calc(1.5rem - 4px);
  width: calc(1.5rem - 4px);
  border-radius: 50%;
  background-color: #9eabb7;
  transition: all 0.5s;
}
input[type="checkbox"]:checked + label {
  background-color: #ffffff;
}
input[type="checkbox"]:checked + label::before {
  margin-left: 0.9rem;
  background-color: #143642;
}

.checkboxToggleChild {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  cursor: pointer;

  &-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}
</style>
