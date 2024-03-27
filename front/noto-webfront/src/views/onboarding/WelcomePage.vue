<template>
  <div class="welcomePage" v-if="showPage">
    <div class="welcomePage-wrapper" v-if="!isLoading">
      <header-steps @event="toggleEvent" :countStep="1" :mode="token.mode" />

      <div class="welcomePage-section">
        <div class="welcomePage-text">
          Vous êtes à {{ allSteps }} {{ data.welcome.text }}
        </div>
        <div class="welcomePage-picture">
          <img src="../../assets/img/logo_unnidata.png" alt="" srcset="" />

          <a class="welcomePage-link" @click="modalOpenManifesto">
            {{ data.welcome.link }}
          </a>
        </div>
      </div>

      <footer-first-step @nextView="nextViewEditUser">
        {{ data.welcome.buttonText }}
      </footer-first-step>
    </div>

    <app-loader v-else />

    <app-modal-stop-enrolment v-if="show" @closeModal="modalStopEnrolment" />

    <app-modal-display-manifesto
      v-if="showManifesto"
      @closeModalManifesto="modalOpenManifesto"
    />
  </div>
  <app-error-session v-else />
</template>

<script>
import { mapGetters } from "vuex";
import onboarding from "../../assets/json/onboarding_text.json";
import { RESET_USER_DATA } from "../../store/modules/users";
import {
  GET_DYNAMIC_TOKEN,
  RESET_PARTNER_DATA,
} from "../../store/modules/partners";
import {
  MODE_API,
  MODE_STANDALONE,
  URL_DOCUMENT,
} from "../../assets/js/constants.js";
import HeaderSteps from "@/components/Header/HeaderSteps.vue";
import FooterFirstStep from "@/components/Footer/FooterFirstStep.vue";
import AppModalStopEnrolment from "@/components/Modal/AppModalStopEnrolment.vue";
import AppModalDisplayManifesto from "@/components/Modal/AppModalDisplayManifesto.vue";
import AppLoader from "@/components/Loader/AppLoader.vue";
import AppErrorSession from "@/components/Message/Error/AppErrorSession.vue";

export default {
  name: "WelcomePage",

  components: {
    HeaderSteps,
    FooterFirstStep,
    AppModalStopEnrolment,
    AppModalDisplayManifesto,
    AppLoader,
    AppErrorSession,
  },

  async mounted() {
    this.$router.currentRoute.path.includes("dyn")
      ? await this.dynamicTokenPartner(MODE_API)
      : await this.dynamicTokenPartner(MODE_STANDALONE);

    this.allSteps = this.token.mode !== 0 ? this.allSteps : 4;

    await this.resetData();
  },

  data() {
    return {
      show: false,
      showManifesto: false,
      isLoading: false,
      allSteps: 3,
      token: {},
      manifesto_url: URL_DOCUMENT,
      data: onboarding,
    };
  },

  computed: {
    ...mapGetters(["displayDynamicToken", "displayCounter"]),
    showPage() {
      return this.displayDynamicToken && this.displayDynamicToken.authorization
        ? this.displayDynamicToken.authorization
        : false;
    },
  },

  methods: {
    toggleEvent(event) {
      if (event.modalStop) this.modalStopEnrolment();
    },

    modalStopEnrolment() {
      this.show = !this.show;
    },
    modalOpenManifesto() {
      this.showManifesto = !this.showManifesto;
    },
    nextViewEditUser() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.$router.push("/editUser/dyn/" + this.$route.params.access_id)
        : this.$router.push("/editUser/sta/" + this.$route.params.access_id);
    },

    async dynamicTokenPartner(mode) {
      this.isLoading = true;

      try {
        this.token = await this.$store.dispatch(GET_DYNAMIC_TOKEN, {
          token: this.$route.params.access_id,
          mode,
        });

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    async resetData() {
      await this.$store.dispatch(RESET_USER_DATA);
    },

    async resetPartnerData() {
      await this.$store.dispatch(RESET_PARTNER_DATA);
    },
  },
};
</script>
