<template>
  <Header class="onboardingComplete-header">
    <div
      class="onboardingComplete-step-indicator"
      :class="{ static: mode === 0 }"
      :data-step="countStep"
    >
      <span v-for="(data, index) in countStep" :key="index"></span>
    </div>
  </Header>
</template>

<script>
import Header from "@/components/Header/Header.vue";

export default {
  name: "HeaderOnboardingComplete",

  components: {
    Header,
  },

  props: {
    mode: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    this.countStep = this.mode !== 0 ? this.countStep : 4;
  },

  data() {
    return {
      countStep: 3,
    };
  },
};
</script>
