<template>
  <transition name="modal">
    <div @click="closeModalAddEmails">
      <div class="modalAddEmails-wrapper">
        <div id="modalConfirm-wrapper" class="modalAddEmails-container">
          <div class="modalAddEmails-body">
            Ce champ vous permet d'ajouter des adresses e-mails supplémentaires.
            Veillez à séparer vos adresses mails complémentaires par une
            virgule!
          </div>
          <div class="modalAddEmails-footer">
            <button class="modalAddEmails-buttonSign" @click="cancelAddEmails">
              <span class="text-white-600">OK, j'ai compris</span>
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="ml-2 modalAddEmails-iconSign"
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
  name: "AppModalAddEmails",

  methods: {
    closeModalAddEmails() {
      this.$emit("closeModalEmails");
    },

    cancelAddEmails() {
      this.$emit("cancelAddEmails");
    },
  },
};
</script>
