<template>
  <div class="loader-wrapper">
    <div class="loader-container">
      <img src="../../assets/img/loading.png" class="loader-icon" />
      <div style="text-align: center" v-if="isSign">
        Cette étape peut prendre quelques minutes...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoader",

  props: {
    isSign: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
