<template>
  <transition name="modal">
    <div @click="closeModalConfirmSign">
      <div class="modalConfirmSign-wrapper">
        <div id="modalConfirm-wrapper" class="modalConfirmSign-container">
          <div class="modalConfirmSign-body">
            Etes-vous sur d'avoir sélectionné tout les marchands que vous
            souhaitez ? <br />
            Il ne vous sera pas possible de revenir en arrière après la
            signature de votre mandat.
          </div>
          <div class="modalConfirmSign-footer">
            <button
              class="modalConfirmSign-buttonCancel"
              @click.once="closeModalConfirmSign"
            >
              <span class="text-white-600">Annuler</span>
            </button>
            <button class="modalConfirmSign-buttonSign" @click="signMandat">
              <span class="text-white-600">Ok je signe</span>
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="ml-2 modalConfirmSign-iconSign"
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
  name: "AppModalConfirmSign",

  methods: {
    closeModalConfirmSign() {
      this.$emit("closeModalConfirm");
    },

    signMandat() {
      this.$emit("confirmSignMandats");
    },
  },
};
</script>
