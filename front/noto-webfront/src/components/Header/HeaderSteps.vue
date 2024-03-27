<template>
  <Header class="headerSteps-header">
    <template v-if="page > 0">
      <button @click="prevView">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </button>

      <div
        class="headerSteps-step-indicator"
        :class="{ static: mode === 0 }"
        :data-step="countStep"
      >
        <template v-if="mode === 0">
          <span v-for="(data, index) in 4" :key="index"></span>
        </template>

        <template v-else>
          <span v-for="(data, index) in 3" :key="index"></span>
        </template>
      </div>
    </template>

    <button
      @click="stopEnrolment"
      class="headerSteps-alignButton"
      :class="{ step: page === 0 }"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" class="" />
    </button>
  </Header>
</template>

<script>
export default {
  name: "HeaderSteps",

  props: {
    countStep: {
      type: Number,
      default: 1,
    },
    mode: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {};
  },

  methods: {
    prevView() {
      this.$emit("event", { prevViewPage: true, modalStop: false });
    },

    stopEnrolment() {
      this.$emit("event", { prevViewPage: false, modalStop: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.headerSteps {
  // &-header {
  //   padding: 15px;
  // }

  &-alignButton {
    &.step {
      position: absolute;
      right: 0;
      top: 0;
      padding: 15px;
    }
  }
}
</style>
