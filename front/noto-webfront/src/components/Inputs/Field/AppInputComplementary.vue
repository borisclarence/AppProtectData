<template>
  <div class="inputText-fields">
    <div class="editUserInformation-newMails">
      <button @click="modalClose">
        <label for="" class="inputText-label">
          {{ labelName }}
        </label>

        <font-awesome-icon
          icon="fa-solid fa-exclamation-circle"
          class="ml-2 editUserInformation-iconSign"
        />
      </button>
    </div>

    <input
      v-bind="$attrs"
      class="inputText-input"
      :class="{ error_input: !!this.fieldErrorsByType }"
      @focus="clearInput"
      @input="handleInput"
    />

    <span class="inputText-errors" v-if="!!fieldErrorsByType">
      {{ fieldErrorsByType }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppInputComplementary",

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
    modalClose() {
      this.$emit("modalClose");
    },

    handleInput(event) {
      this.$emit("input", event.target.value);
    },

    clearInput() {
      this.$emit("focus");
    },
  },
};
</script>
