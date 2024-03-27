<template>
  <div class="home">
    <WelcomePage />
  </div>
</template>

<script>
import WelcomePage from "@/views/onboarding/WelcomePage.vue";

export default {
  name: "Home",
  components: {
    WelcomePage,
  },
};
</script>

<style lang="scss" scoped>
.home {
  overflow: hidden;
}
</style>
