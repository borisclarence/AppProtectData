<template>
  <transition>
    <div @click="closeModalUserExists">
      <div class="modalUserExists-wrapper">
        <div id="modal-wrapper" class="modalUserExists-container">
          <div class="modalUserExists-body">
            Vous avez déja un mandat en cours. Vous ne pouvez pas cumulé
            plusieurs mandats.
          </div>
          <a
            :href="'/welcome/' + this.$route.params.access_id"
            class="modalUserExists-button mx-auto"
          >
            retour à l'accueil
            <font-awesome-icon
              icon="fa-solid fa-arrow-right"
              class="ml-2 editUserInformation-icon"
            />
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModalUserExists",

  methods: {
    closeModalUserExists() {
      if (
        document
          .getElementById("modal-wrapper")
          .classList.contains(".modalStopEnrolment-wrapper")
      )
        return;

      this.$emit("closeModalUserExists");
    },
  },
};
</script>
