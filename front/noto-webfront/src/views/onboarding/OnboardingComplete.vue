<template>
  <!-- View to confirm validation of user signing -->
  <div class="onboardingComplete" v-if="status">
    <div class="onboardingComplete-wrapper">
      <div class="onboardingComplete-content">
        <!-- Header  -->
        <header-onboarding-complete :mode="mode" />

        <div class="onboardingComplete-section">
          <!-- Display congratulation text if user signed -->
          <template v-if="status === 'completed'">
            <div class="onboardingComplete-title">
              <img src="../../assets/img/applause.png" />
              <div class="onboardingComplete-text">Félicitations&nbsp;!</div>
            </div>

            <div class="onboardingComplete-subtitle">
              <p class="onboardingComplete-subtitleOne">
                Nous allons à présent nous rapprocher de chacun de vos
                marchands. La récupération des données peut prendre jusqu'à 1
                mois…
              </p>
              <p>
                Un peu de patience et vous pourrez accéder aux données de vos
                tickets de caisse !
              </p>
            </div>
          </template>

          <!-- Display retry signing text if user not signed -->
          <template v-else>
            <div class="onboardingComplete-titleDeclined">
              <img src="../../assets/img/palm-of-hand-gray.png" />
              <div class="onboardingComplete-text">
                Vous n'avez pas terminé votre enrôlement&nbsp;!
              </div>
            </div>

            <div class="onboardingComplete-subtitle">
              <p class="onboardingComplete-subtitleOne">
                Vous pouvez recommencer à tout moment!
              </p>
            </div>
          </template>
        </div>

        <!-- Button to close current window in dynamic mode -->
        <footer-first-step @nextView="closeWindow">Terminé</footer-first-step>
      </div>
    </div>
  </div>

  <app-loader v-else />
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_ENVELOPE_STATUS,
  RESET_USER_DATA,
} from "../../store/modules/users";
import { RESET_PARTNER_DATA } from "../../store/modules/partners";
import HeaderOnboardingComplete from "@/components/Header/HeaderOnboardingComplete.vue";
import FooterFirstStep from "@/components/Footer/FooterFirstStep.vue";
import AppLoader from "@/components/Loader/AppLoader.vue";

export default {
  name: "OnboardingComplete",
  components: { HeaderOnboardingComplete, FooterFirstStep, AppLoader },

  async mounted() {
    if (
      !this.displayEnvelopeInfos.envelopeId ||
      !this.displayEnvelopeInfos.accountId
    ) {
      return;
    }

    await this.$nextTick();
    await this.getEnvelopeStatus(
      this.displayEnvelopeInfos.envelopeId,
      this.displayEnvelopeInfos.accountId
    );

    this.mode = this.$router.currentRoute.path.includes("dyn") ? 1 : 0;

    await this.resetData();
  },
  data() {
    return {
      status: "",
      token: {},
      mode: 0,
    };
  },
  computed: {
    ...mapGetters(["displayEnvelopeInfos"]),
    currentRoute() {
      return this.$router.currentRoute;
    },
  },

  methods: {
    /**
     * Method to close current window when user complete signing
     */
    closeWindow() {
      const message = {
        status: "COMPLETED",
      };
      top.postMessage(message, "*");
    },

    /**
     * Get status envelop (documents) signed (Envelop docusign)
     * @param {*} envelopeId
     * @param {*} accountId
     */
    async getEnvelopeStatus(envelopeId, accountId) {
      this.status = await this.$store.dispatch(GET_ENVELOPE_STATUS, {
        envelopeId,
        accountId,
      });
    },

    /**
     * Method to reset cache of store
     */
    async resetData() {
      await this.$store.dispatch(RESET_USER_DATA);
      await this.$store.dispatch(RESET_PARTNER_DATA);
    },
  },
};
</script>
