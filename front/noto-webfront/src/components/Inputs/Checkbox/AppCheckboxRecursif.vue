<template id="x-item">
  <app-checkbox-toggle-all
    v-if="typeCheckbox === 'globalToggle'"
    :isAllSelectedCategories="item.checked"
    @checkAllCategories="sendStateCheckbox"
  >
    <span>{{ item.name }}</span>
    <sup class="selectMerchants-textMerchantSelectedCount"> ({{ total }}) </sup>
  </app-checkbox-toggle-all>

  <app-checkbox-toggle-child
    v-else-if="typeCheckbox === 'toggle'"
    :isSelectedCategory="item.checked"
    :idCheckbox="item.id"
    @checkCategory="sendStateCheckbox"
  >
    <span>{{ item.name }}</span>
  </app-checkbox-toggle-child>

  <label
    :for="`input-${item.id}`"
    class="checkbox-container checkbox-container--blue"
    v-else-if="typeCheckbox === 'child'"
  >
    <input
      type="checkbox"
      name=""
      :id="`input-${item.id}`"
      class="option-merchant"
      :checked="item.checked"
      @change="sendStateCheckbox"
    />
    <span class="text">{{ item.name }}</span>
    <span class="checkmark light"></span>
  </label>

  <label for="" v-else>
    <input
      type="checkbox"
      name=""
      id=""
      :checked="item.checked"
      @change="sendStateCheckbox"
    />
    <span>{{ item.name }}</span>
  </label>
</template>

<script>
import AppCheckboxToggleAll from "@/components/Inputs/Checkbox/AppCheckboxToggleAll.vue";
import AppCheckboxToggleChild from "@/components/Inputs/Checkbox/AppCheckboxToggleChild.vue";

export default {
  name: "AppCheckboxRecursif",

  components: {
    AppCheckboxToggleAll,
    AppCheckboxToggleChild,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    total: {
      type: Number,
      default: 0,
    },

    typeCheckbox: {
      type: String,
      default: "basicCheckbox",
    },
  },

  methods: {
    sendStateCheckbox(event) {
      this.$emit("change", this.item, event.target.checked);
    },
  },
};
</script>
