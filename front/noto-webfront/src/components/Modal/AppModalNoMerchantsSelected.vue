<template>
  <transition>
    <div @click="closeModalNoMerchantSelected">
      <div class="modalNoMerchantsSelected-wrapper">
        <div id="modal-wrapper" class="modalNoMerchantsSelected-container">
          <div class="modalNoMerchantsSelected-body">
            Vous devez sélectionner au moins un marchand pour signer un mandat
          </div>
          <div class="modalNoMerchantsSelected-actions">
            <button
              @click="closeCancelNoMerchantSelected"
              class="modalNoMerchantsSelected-button"
            >
              Ok, je coche
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="ml-2 modalNoMerchantsSelected-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModalNoMerchantsSelected",

  methods: {
    closeModalNoMerchantSelected() {
      this.$emit("closeModalNoMerchant");
    },

    closeCancelNoMerchantSelected() {
      this.$emit("cancelModalNoMerchant");
    },
  },
};
</script>
