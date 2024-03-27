<template>
  <iframe
    :src="url_sign"
    class="process-iframe"
    width="100%"
    frameborder="0"
    align="center"
    allow="fullscreen"
    ref="docusignRef"
  ></iframe>
</template>

<script>
export default {
  name: "AppIframe",

  props: {
    url_sign: {
      type: String,
      required: true,
    },
  },
};
</script>
