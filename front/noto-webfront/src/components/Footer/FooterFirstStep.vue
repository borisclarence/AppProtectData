<template>
  <Footer class="welcomePage-footer">
    <button class="welcomePage-button mx-auto" @click="nextView">
      <span class="welcomePage-textFooter">
        <slot />
      </span>
      <font-awesome-icon
        icon="fa-solid fa-arrow-right"
        class="ml-2 welcomePage-iconArrow"
      />
    </button>
  </Footer>
</template>

<script>
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: "FooterFirstStep",

  components: {
    Footer,
  },

  methods: {
    nextView() {
      this.$emit("nextView");
    },
  },
};
</script>
