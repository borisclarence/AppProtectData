<template>
  <div class="inputText-fields">
    <label for="" class="inputText-label">{{ labelName }} *</label>

    <input
      v-bind="$attrs"
      class="inputText-input"
      :class="{ error_input: !!this.fieldErrorsByType }"
      @focus="clearInput"
      @input="handleInput"
    />
    <span class="inputText-errors" v-if="!!fieldErrorsByType">{{
      fieldErrorsByType
    }}</span>
  </div>
</template>

<script>
export default {
  name: "AppInputText",

  props: {
    labelName: {
      type: String,
      require: true,
    },

    fieldErrorsByType: {
      type: String,
      require: true,
    },

    dataInput: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      value: this.dataInput,
      modelValue: null,
    };
  },

  mounted() {
    this.value = this.dataInput;
  },

  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    },

    clearInput() {
      this.$emit("focus");
    },
  },
};
</script>
