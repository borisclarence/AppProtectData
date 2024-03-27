<template>
  <div class="confirmationCode" v-if="showPage">
    <div class="confirmationCode-wrapper">
      <header-steps
        @event="toggleEvent"
        :countStep="countStep"
        :mode="token.mode"
        :page="page"
      />

      <section class="confirmationCode-section">
        <div class="confirmationCode-content">
          <h1 class="confirmationCode-title">Confirmation coordonnées</h1>

          <p class="confirmationCode-description">
            Pour confirmer votre inscription, vous devez confirmer votre numéro
            de téléphone et votre e-mail. Pour ce faire, merci de remplir les
            codes que vous avez reçu par e-mail et SMS dans les champs
            ci-dessous
          </p>

          <p
            v-if="messageValidation"
            class="confirmationCode-errorValidatedCode"
          >
            {{ messageValidation }}
          </p>
        </div>

        <div class="confirmationCode-form">
          <div class="confirmationCode-fields">
            <label for="" class="confirmationCode-label">Code SMS</label>

            <div class="confirmationCode-inputValidated">
              <input
                type="text"
                name="smsCode"
                id="smsCode"
                class="confirmationCode-input"
                v-model="userCode.smsCode"
                :disabled="isSmsApproved"
                :class="{ error_input_code: error_value_code.smsCode }"
                @focus="clearInput('smsCode')"
              />
              <img
                v-if="isSmsApproved"
                src="../../assets/img/large-check.png"
                alt=""
                srcset=""
                class="confirmationCode-iconConfirmation"
              />
            </div>
            <div class="confirmationCode-messages">
              <span
                class="confirmationCode-errors"
                v-if="error_value_code.smsCode !== ''"
                >{{ error_value_code.smsCode }}</span
              >

              <div class="confirmationCode-spans">
                <a
                  class="confirmationCode-link"
                  @click="reSendSMS"
                  v-if="!isSmsApproved"
                  >Renvoyer un SMS
                </a>

                <div
                  class="confirmationCode-errorValidatedCode right"
                  v-if="messageResend.smsCode !== ''"
                >
                  {{ messageResend.smsCode }}
                </div>
              </div>
            </div>
          </div>

          <div class="confirmationCode-fields">
            <label for="" class="confirmationCode-label">Code Email</label>

            <div class="confirmationCode-inputValidated">
              <input
                type="text"
                name="emailCode"
                id="emailCode"
                class="confirmationCode-input"
                v-model="userCode.emailCode"
                :disabled="isEmailApproved"
                :class="{ error_input_code: error_value_code.emailCode }"
                @focus="clearInput('emailCode')"
              />

              <img
                v-if="isEmailApproved"
                src="../../assets/img/large-check.png"
                alt=""
                srcset=""
                class="confirmationCode-iconConfirmation"
              />
            </div>

            <div class="confirmationCode-messages">
              <span
                class="confirmationCode-errors"
                v-if="error_value_code.emailCode !== ''"
                >{{ error_value_code.emailCode }}</span
              >

              <div class="confirmationCode-spans">
                <a
                  class="confirmationCode-link"
                  @click="reSendEmail"
                  v-if="!isEmailApproved"
                  >Renvoyer un Email
                </a>
                <div
                  class="confirmationCode-errorValidatedCode right"
                  v-if="messageResend.emailCode !== ''"
                >
                  {{ messageResend.emailCode }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer class="confirmationCode-footer">
        <div class="confirmationCode-button mx-auto" @click="confirmCode">
          <span>Suivant</span>
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="ml-2 confirmationCode-iconArrow"
          />
        </div>
      </Footer>
    </div>

    <app-modal-stop-enrolment v-show="show" @closeModal="modalStopEnrolment" />
  </div>
  <app-error-session v-else />
</template>

<script>
import { mapGetters } from "vuex";
import { GET_DYNAMIC_TOKEN } from "../../store/modules/partners";
import {
  SET_VALIDATE_CODES,
  GET_SMS_CODE,
  GET_EMAIL_CODE,
  VALIDATE_CODES,
} from "../../store/modules/users";
import { MODE_API, MODE_STANDALONE } from "../../assets/js/constants.js";
import { isDisabled } from "../../assets/js/scripts.js";
import { handleSubmitBehavior } from "../../assets/js/controls/handleConfirmationCode.js";
import HeaderSteps from "@/components/Header/HeaderSteps.vue";
import Footer from "@/components/Footer/Footer.vue";
import AppModalStopEnrolment from "@/components/Modal/AppModalStopEnrolment.vue";
import AppErrorSession from "@/components/Message/Error/AppErrorSession.vue";

export default {
  name: "ConfirmationCode",

  components: {
    HeaderSteps,
    Footer,
    AppModalStopEnrolment,
    AppErrorSession,
  },

  data() {
    return {
      show: false,
      isFormValidated: false,
      userCode: {
        smsCode: "",
        emailCode: "",
      },
      error_value_code: {
        smsCode: "",
        emailCode: "",
      },
      infosUser: null,
      messageValidation: "",
      messageResend: {
        smsCode: "",
        emailCode: "",
      },
      user: {},
      token: {},
      isSmsApproved: false,
      isEmailApproved: false,
      countStep: 2,
      page: 2,
    };
  },

  async mounted() {
    this.$router.currentRoute.path.includes("dyn")
      ? await this.dynamicTokenPartner(MODE_API)
      : await this.dynamicTokenPartner(MODE_STANDALONE);

    this.infosUser = this.displayVerifInfoCode;

    handleSubmitBehavior();
  },

  computed: {
    ...mapGetters([
      "displayUser",
      "displayDynamicToken",
      "displayVerifInfoCode",
    ]),
    showPage() {
      return this.displayDynamicToken && this.displayDynamicToken.authorization
        ? this.displayDynamicToken.authorization
        : false;
    },
  },

  methods: {
    //modal
    toggleEvent(event) {
      if (event.modalStop) this.modalStopEnrolment();

      if (event.prevViewPage) this.prevEditUser();
    },

    modalStopEnrolment() {
      this.show = !this.show;
    },

    //routes
    addRouterForPrevPage(token, pref_mode) {
      this.$router.push("/editUser/" + pref_mode + "/" + token);
    },

    addRouterForNextPage(token, status_merchant_list, pref_mode) {
      this.$router.push(
        "/selectMerchants/" +
          pref_mode +
          "/" +
          token +
          "?isAllSelected=" +
          status_merchant_list
      );
    },

    goToNextView() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.addRouterForNextPage(
            this.$route.params.access_id,
            this.displayUser.checkboxMerchant,
            "dyn"
          )
        : this.addRouterForNextPage(
            this.$route.params.access_id,
            this.displayUser.checkboxMerchant,
            "sta"
          );
    },

    prevEditUser() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.addRouterForPrevPage(this.$route.params.access_id, "dyn")
        : this.addRouterForPrevPage(this.$route.params.access_id, "sta");
    },

    //clear input
    clearInput(value) {
      this.error_value_code[value] = "";
      this.messageValidation = "";
      this.messageResend[value] = "";
    },

    //request
    async reSendSMS() {
      this.error_value_code["smsCode"] = "";
      let data = await this.$store.dispatch(GET_SMS_CODE, {
        toSms: this.displayUser.phone,
        toEmail: this.displayUser.email,
      });

      this.controlErrorResend(data, "codeSms", "smsCode");
    },

    async reSendEmail() {
      this.error_value_code["emailCode"] = "";
      let data = await this.$store.dispatch(GET_EMAIL_CODE, {
        toSms: this.displayUser.phone,
        toEmail: this.displayUser.email,
      });

      this.controlErrorResend(data, "codeEmail", "emailCode");
    },

    async dynamicTokenPartner(mode) {
      this.token = await this.$store.dispatch(GET_DYNAMIC_TOKEN, {
        token: this.$route.params.access_id,
        mode,
      });
    },

    async validatesCodeUser() {
      const data = await this.$store.dispatch(VALIDATE_CODES, {
        toSms: this.displayUser.phone,
        toEmail: this.displayUser.email,
        codeSms: this.userCode.smsCode,
        codeEmail: this.userCode.emailCode,
      });

      return data;
    },

    //form validation
    async confirmCode() {
      const data = await this.validatesCodeUser();
      const isAllValid = data.authorization;

      if (isAllValid) {
        this.messageValidation = data.message;

        this.user.status = data.authorization;
        this.user.code_sms = data.statusSms.statusCode;
        this.user.code_email = data.statusSms.statusCode;

        this.$store.commit(SET_VALIDATE_CODES, this.user);

        this.goToNextView();
      } else this.getErrorsCodeSmsAndEmail(data);
    },

    // controls errors
    getErrorsCodeSmsAndEmail(data) {
      if (data.statusSms?.statusCode === 200) {
        this.isSmsApproved = true;
        isDisabled("smsCode");

        this.messageResend.emailCode = data.statusEmail?.message;
      } else if (data.statusEmail?.statusCode === 200) {
        this.isEmailApproved = true;
        isDisabled("emailCode");

        this.messageResend.smsCode = data.statusSms?.message;
      } else
        this.messageValidation = "Erreur code sms/email invalide ou expiré";
    },

    controlErrorResend(data, nameCode, nameMessageCode) {
      if (data.authorization) {
        this.infosUser[nameCode] = data[nameCode];
      } else {
        if (data?.statusCode === 429)
          this.messageResend[nameMessageCode] = data?.message;

        this.messageResend[nameMessageCode] = data.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="text"]:disabled {
  border: 1px solid #08cc0a;
}
</style>
