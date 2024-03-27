<template>
  <transition name="modal">
    <div @click="closeModalAddMobiles">
      <div class="modalAddMobiles-wrapper">
        <div id="modalConfirm-wrapper" class="modalAddMobiles-container">
          <div class="modalAddMobiles-body">
            Ce champ vous permet d'ajouter des numéros de téléphones
            supplémentaires. Veillez à séparer vos numéros complémentaires par
            une virgule!
          </div>
          <div class="modalAddMobiles-footer">
            <button
              class="modalAddMobiles-buttonSign"
              @click="cancelAddMobiles"
            >
              <span class="text-white-600">OK, j'ai compris</span>
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="ml-2 modalAddMobiles-iconSign"
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
  name: "AppModalAddMobiles",

  methods: {
    closeModalAddMobiles() {
      this.$emit("closeModalMobiles");
    },

    cancelAddMobiles() {
      this.$emit("cancelAddMobiles");
    },
  },
};
</script>
