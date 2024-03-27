<template>
  <div class="inputText-fields">
    <label for="" class="inputText-label">{{ labelName }} *</label>

    <input
      v-bind="$attrs"
      class="inputText-input"
      placeholder="JJ/MM/AAAA"
      :class="{ error_input: !!this.fieldErrorsBirthdate }"
      @focus="clearInput"
      @input="handleInput"
    />

    <span class="editUserInformation-errors" v-if="!!fieldErrorsBirthdate">
      {{ fieldErrorsBirthdate }}
    </span>

    <span class="editUserInformation-errors" v-if="!!fieldErrorsYoungUser">
      {{ fieldErrorsYoungUser }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppInputDate",

  props: {
    labelName: {
      type: String,
      require: true,
    },

    fieldErrorsBirthdate: {
      type: String,
      require: true,
    },

    fieldErrorsYoungUser: {
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
