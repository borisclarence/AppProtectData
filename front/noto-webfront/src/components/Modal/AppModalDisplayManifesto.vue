<template>
  <Transition name="slide-fade">
    <div @click="closeModalManifesto" class="modalDisplayManifesto">
      <div class="modalDisplayManifesto-wrapper" :class="{ out: show }">
        <div id="modal-wrapper" class="modalDisplayManifesto-container">
          <div class="modalDisplayManifesto-body">
            <div class="modalDisplayManifesto-close">
              <div class="modalDisplayManifesto-bar"></div>

              <button
                class="modalDisplayManifesto-buttonCross"
                @click="closeModalManifesto"
              >
                <font-awesome-icon
                  icon="fa-solid fa-xmark"
                  class="modalDisplayManifesto-closeIcon"
                />
              </button>
            </div>

            <h1 class="modalDisplayManifesto-title">Manifesto</h1>
            <div class="modalDisplayManifesto-section">
              <p>
                Chaque jour, les consommateurs laissent des traces numériques de
                leurs achats que les marchands utilisent pour mieux vendre. Nous
                oeuvrons pour que chaque consommateur utilise ses données pour
                mieux acheter.
              </p>

              <p>
                Nous représentons nos utilisateurs auprès de leurs marchands de
                biens et de services afin que ces derniers considèrent leurs
                attitudes
              </p>

              <p>
                et leurs actes vis-à-vis des données personnelles qu’ils
                détiennent comme un élément fondamental de leurs relation
                clients.
              </p>

              <p>
                Nous favorisons l’innovation à travers notre écosystème
                d’applications partenaires qui développent de multiples services
                permettant à nos utilisateurs de consommer en harmonie avec
                leurs convictions personnelles et leurs moyens.
              </p>

              <p>
                Nous mettons le consentement de nos utilisateurs au cœur de nos
                actions en garantissant une transparence et une traçabilité
                maximales tout en veillant à vérifier régulièrement son
                intégrité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { URL_DOCUMENT } from "../../assets/js/constants.js";

export default {
  name: "AppModalDisplayManifesto",

  data() {
    return {
      show: false,

      manifesto_url: URL_DOCUMENT,
    };
  },

  methods: {
    closeModalManifesto() {
      if (
        document
          .getElementById("modal-wrapper")
          .classList.contains(".modalDataReceipt-wrapper")
      )
        return;

      this.$emit("closeModalManifesto");
      // this.show = !this.show;
    },
  },
};
</script>
