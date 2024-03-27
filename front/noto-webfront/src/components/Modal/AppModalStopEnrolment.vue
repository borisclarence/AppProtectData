<template>
  <transition>
    <div @click="closeModalReceipts">
      <div class="modalStopEnrolment-wrapper">
        <div id="modal-wrapper" class="modalStopEnrolment-container">
          <div class="modalStopEnrolment-body">
            Vous êtes sur le point d'abandonner la demande de mandat
          </div>
          <div class="modalStopEnrolment-actions">
            <button
              @click="cancelEnrolement"
              class="modalStopEnrolment-button modalStopEnrolment-button--light"
            >
              Oui, Annuler
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="ml-2 editUserInformation-icon"
              />
            </button>
            <button
              @click="closeCancelModalEnrolement"
              class="modalStopEnrolment-button"
            >
              Continuer
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="ml-2 editUserInformation-icon"
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
  name: "AppModalStopEnrolment",

  methods: {
    closeModalReceipts() {
      if (
        document
          .getElementById("modal-wrapper")
          .classList.contains(".modalDataReceipt-wrapper")
      )
        return;

      this.$emit("closeModal");
    },

    closeCancelModalEnrolement() {
      this.$emit("closeCancelModal");
    },

    cancelEnrolement() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.$router.replace("/welcome/dyn/" + this.$route.params.access_id)
        : this.$router.replace("/welcome/sta/" + this.$route.params.access_id);
    },
  },
};
</script>
