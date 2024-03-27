<template>
  <div class="editUserInformation" v-if="showPage">
    <div class="editUserInformation-wrapper" v-if="!isLoading">
      <header-steps
        @event="toggleEvent"
        :countStep="1"
        :mode="token.mode"
        :page="1"
      />

      <div class="editUserInformation-formContent">
        <div class="editUserInformation-content">
          <div class="editUserInformation-section">
            <div class="editUserInformation-title mr-auto">
              {{ data.editUser.title }}
            </div>
            <div class="editUserInformation-subtitle">
              {{ data.editUser.subtitle }}
            </div>

            <div v-if="Object.keys(fieldErrorsByType).length">
              <ul class="editUserInformation-ul_errors">
                <li v-for="(error, index) in fieldErrorsByType" :key="index">
                  <span class="editUserInformation-errors">
                    {{ error.message }}
                  </span>
                </li>
              </ul>
            </div>

            <span
              id="messageForSmsAndEmail"
              class="editUserInformation-errors"
              >{{ messageForStatusEmailAndSms }}</span
            >

            <div class="editUserInformation-form">
              <app-input-text
                labelName="Prénom"
                type="text"
                name="firstname"
                id="firstname"
                :fieldErrorsByType="fieldErrorsByType.firstname"
                :disabled="isDisabled"
                v-model="user.firstname"
                @focus="clearInputError('firstname', true)"
              />

              <app-input-text
                labelName="Nom"
                type="text"
                name="lastname"
                id="lastname"
                :fieldErrorsByType="fieldErrorsByType.lastname"
                :disabled="isDisabled"
                v-model="user.lastname"
                @focus="clearInputError('lastname', true)"
              />

              <app-input-date
                labelName="Date de naissance"
                type="text"
                name="birthdate"
                id="birthdate"
                :fieldErrorsBirthdate="fieldErrorsByType.birthdate"
                :fieldErrorsYoungUser="fieldErrorsByType.youngUser"
                v-model="user.birthdate"
                @focus="clearInputError('birthdate', true)"
              />

              <app-input-text
                labelName="Adresse email"
                type="email"
                name="email"
                id="email"
                :fieldErrorsByType="fieldErrorsByType.email"
                v-model="user.email"
                @focus="clearInputError('email')"
              />

              <app-input-text
                labelName="N° téléphone mobile"
                type="tel"
                name="phone"
                id="phone"
                :fieldErrorsByType="fieldErrorsByType.phone"
                v-model="user.phone"
                @focus="clearInputError('phone')"
              />

              <app-input-complementary
                labelName="Autres adresses mails"
                type="text"
                name="emailOthers"
                id="emailOthers"
                :fieldErrorsByType="fieldErrorsByType.emailOthers"
                v-model="user.emailOthers"
                @focus="clearInputError('emailOthers')"
                @modalClose="modalCloseEmails"
              />

              <app-input-complementary
                labelName="Mobiles complémentaires"
                type="text"
                name="phoneOthers"
                id="phoneOthers"
                :fieldErrorsByType="fieldErrorsByType.phoneOthers"
                v-model="user.phoneOthers"
                @focus="clearInputError('phoneOthers')"
                @modalClose="modalCloseMobiles"
              />

              <div class="editUserInformation-checkCGU">
                <div class="editUserInformation-inputsCGU">
                  <label class="checkbox-container--blue">
                    <input
                      type="checkbox"
                      name=""
                      id="checkboxUser"
                      class="editUserInformation-inputCGU"
                      required
                      v-model="user.checkboxUser"
                      @focus="clearInputError('checkboxUser', true)"
                    />
                    <span class="text"
                      >J'ai lu et j'accepte les
                      <a
                        :href="documents_url + '/document/read/cgu'"
                        class="editUserInformation-links"
                        target="_blank"
                        >conditions générales d'utilisation
                      </a>
                      et
                      <a
                        :href="documents_url + '/document/read/charte_cgu'"
                        class="editUserInformation-links"
                        target="_blank"
                        >la charte de confidentialité
                      </a>
                    </span>
                    <span
                      id="checkboxUserErrors"
                      class="checkmark"
                      :class="{
                        error_input: !!fieldErrorsByType.checkboxUser,
                      }"
                    ></span>
                  </label>
                  <span
                    class="editUserInformation-errors"
                    v-if="!!fieldErrorsByType.checkboxUser"
                    >{{ fieldErrorsByType.checkboxUser }}</span
                  >
                </div>
              </div>

              <div
                class="editUserInformation-checkCGU space"
                v-if="
                  currentRoute.includes('dyn') &&
                  displayDynamicToken.mode === api_with_expense
                "
              >
                <div class="editUserInformation-inputsCGU">
                  <label class="checkbox-container checkbox-container--blue">
                    <input
                      type="checkbox"
                      name=""
                      id="checkboxMerchant"
                      class="editUserInformation-inputCGU"
                      required
                      v-model="user.checkboxMerchant"
                      @focus="clearInputError('checkboxMerchant', true)"
                    />
                    <span class="text">
                      {{ data.editUser.textCheckboxMerchant }}
                    </span>
                    <span
                      id="checkboxMerchantsErrors"
                      class="checkmark"
                      :class="{
                        error_input: !!fieldErrorsByType.checkboxMerchants,
                      }"
                    ></span>
                    <span
                      class="editUserInformation-errors down"
                      v-if="!!fieldErrorsByType.checkboxMerchants"
                      >{{ fieldErrorsByType.checkboxMerchants }}</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer class="editUserInformation-footer">
        <div
          class="editUserInformation-button mx-auto"
          @click="editInformation"
        >
          <span>{{ data.editUser.buttonText }}</span>
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="ml-2 editUserInformation-iconArrow"
          />
        </div>
      </Footer>
    </div>

    <app-loader v-else />

    <app-modal-stop-enrolment v-show="show" @closeModal="modalStopEnrolment" />

    <app-modal-user-exists
      v-show="showExistsUsers"
      @closeModalUserExists="modalExistUsers"
    />

    <app-modal-add-emails
      v-show="showFormEmails"
      @closeModalEmails="modalCloseEmails"
    />

    <app-modal-add-mobiles
      v-show="showFormMobiles"
      @closeModalMobiles="modalCloseMobiles"
    />
  </div>
  <app-error-session v-else />
</template>

<script>
import onboarding from "../../assets/json/onboarding_text.json";
import { GET_DYNAMIC_TOKEN } from "../../store/modules/partners";
import {
  SET_USER,
  GET_USER_VERIFICATION,
  GET_SMS_AND_MAIL,
  CHECK_STATUS_SMS_AND_MAIL,
  SET_COUNTER,
} from "../../store/modules/users";
import {
  URL_DOCUMENT,
  MODE_API,
  MODE_STANDALONE,
} from "../../assets/js/constants.js";
import { parsingDate, addDynamicSlashes } from "../../assets/js/scripts.js";
import { handleEditUserField } from "../../assets/js/controls/handleEditUserField";
import { mapGetters } from "vuex";
import HeaderSteps from "@/components/Header/HeaderSteps.vue";
import Footer from "@/components/Footer/Footer.vue";
import AppInputText from "@/components/Inputs/Field/AppInputText.vue";
import AppInputDate from "@/components/Inputs/Field/AppInputDate.vue";
import AppInputComplementary from "@/components/Inputs/Field/AppInputComplementary.vue";
import AppModalStopEnrolment from "@/components/Modal/AppModalStopEnrolment.vue";
import AppModalUserExists from "@/components/Modal/AppModalUserExists.vue";
import AppModalAddEmails from "@/components/Modal/AppModalAddEmails.vue";
import AppModalAddMobiles from "@/components/Modal/AppModalAddMobiles.vue";
import AppLoader from "@/components/Loader/AppLoader.vue";
import AppErrorSession from "@/components/Message/Error/AppErrorSession.vue";

export default {
  name: "EditUserInformation",
  components: {
    HeaderSteps,
    Footer,
    AppInputText,
    AppInputDate,
    AppInputComplementary,
    AppModalStopEnrolment,
    AppModalUserExists,
    AppModalAddEmails,
    AppModalAddMobiles,
    AppLoader,
    AppErrorSession,
  },

  data() {
    return {
      show: false,
      showExistsUsers: false,
      showFormEmails: false,
      showFormMobiles: false,
      isLoading: false,
      user: {
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        emailOthers: "",
        phone: "",
        phoneOthers: "",
        checkboxUser: false,
        checkboxMerchant: true,
        listMerchantSelected: [],
      },
      documents_url: URL_DOCUMENT,
      token: {},
      api_with_expense: MODE_API,
      infosUser: null,
      fieldErrorsByType: [],
      messageForStatusEmailAndSms: "",
      data: onboarding,
    };
  },
  async mounted() {
    this.user.checkboxMerchant = false;
    const routeIncludesDyn = this.$router.currentRoute.path.includes("dyn");

    this.setDataInStaticMode(routeIncludesDyn);

    if (routeIncludesDyn) {
      await this.dynamicTokenPartner(MODE_API);

      this.setDataInDynamicMode();
    }

    if (!routeIncludesDyn) {
      await this.dynamicTokenPartner(MODE_STANDALONE);
      this.user.birthdate = this.displayUser.birthdate;
      this.user.checkboxMerchant = false;
    }

    handleEditUserField();

    window.addEventListener("load", function () {
      setTimeout(function () {
        // Hide the address bar!
        window.scrollTo(0, 1);
      }, 0);
    });

    this.$store.commit(SET_COUNTER, 1);
  },
  computed: {
    ...mapGetters(["displayUser", "displayDynamicToken"]),
    showPage() {
      return this.displayDynamicToken && this.displayDynamicToken.authorization
        ? this.displayDynamicToken.authorization
        : false;
    },
    currentRoute() {
      return this.$router.currentRoute.path;
    },
    isDisabled() {
      return this.$router.currentRoute.path.includes("dyn") ? true : false;
    },
  },

  methods: {
    //modal
    toggleEvent(event) {
      if (event.modalStop) this.modalStopEnrolment();

      if (event.prevViewPage) this.prevManifesto();
    },

    modalStopEnrolment() {
      this.show = !this.show;
    },
    modalExistUsers() {
      this.showExistsUsers = !this.showExistsUsers;
    },
    modalCloseEmails(event) {
      if (event) event.preventDefault();
      this.showFormEmails = !this.showFormEmails;
    },

    modalCloseMobiles(event) {
      if (event) event.preventDefault();
      this.showFormMobiles = !this.showFormMobiles;
    },

    //routes
    addRouterForNextPage(token, pref_mode) {
      this.$router.push("/confirmation/" + pref_mode + "/" + token);
    },

    addRouterForPrevPage(token, pref_mode) {
      this.$router.push("/welcome/" + pref_mode + "/" + token);
    },

    addRouterForMerchantPage(token, status_merchant_list, pref_mode) {
      this.$router.push(
        "/selectMerchants/" +
          pref_mode +
          "/" +
          token +
          "?isAllSelected=" +
          status_merchant_list
      );
    },

    prevManifesto() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.addRouterForPrevPage(this.$route.params.access_id, "dyn")
        : this.addRouterForPrevPage(this.$route.params.access_id, "sta");
    },

    goTonextView() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.addRouterForNextPage(this.$route.params.access_id, "dyn")
        : this.addRouterForNextPage(this.$route.params.access_id, "sta");
    },

    goToViewMerchant() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.addRouterForMerchantPage(
            this.$route.params.access_id,
            this.user.checkboxMerchant,
            "dyn"
          )
        : this.addRouterForMerchantPage(
            this.$route.params.access_id,
            this.user.checkboxMerchant,
            "sta"
          );
    },

    //request
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

    async checkStatusSmsAndEmail() {
      const data = await this.$store.dispatch(CHECK_STATUS_SMS_AND_MAIL, {
        toSms: this.user.phone,
        toEmail: this.user.email,
        token: this.$route.params.access_id,
        mode: this.displayDynamicToken.mode ?? 0,
      });

      return data;
    },

    async getSmsAndEmail() {
      this.infosUser = await this.$store.dispatch(GET_SMS_AND_MAIL, {
        toSms: this.displayUser.phone,
        toEmail: this.displayUser.email,
      });
    },

    async formVerification() {
      const data = await this.$store.dispatch(GET_USER_VERIFICATION, {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        birthdate: this.user.birthdate,
        email: this.user.email,
        phone: this.user.phone,
        emailOthers: this.user.emailOthers,
        phoneOthers: this.user.phoneOthers,
        checkboxUser: this.user.checkboxUser,
        checkboxMerchants: this.user.checkboxMerchant,
        mode: this.token.mode,
      });

      return data;
    },

    async editInformation() {
      const data = await this.formVerification();

      if (data.status) {
        this.$store.commit(SET_USER, this.user);

        if (this.token.mode === 0) {
          const isApproved = await this.checkStatusSmsAndEmail();

          if (!isApproved.authorization) {
            await this.getSmsAndEmail();

            // if (this.infosUser.authorization) this.goTonextView();
            // else this.messageForStatusEmailAndSms = this.infosUser.message;
            this.goTonextView();
          } else this.goToViewMerchant();
        } else this.goToViewMerchant();
      } else this.verifyFormInBack(data);
    },

    setDataInStaticMode(routeIncludesDyn) {
      this.user.firstname = routeIncludesDyn
        ? this.displayDynamicToken.firstname
        : this.displayUser.firstname;
      this.user.lastname = routeIncludesDyn
        ? this.displayDynamicToken.lastname
        : this.displayUser.lastname;
      this.user.emailOthers = this.displayUser.emailOthers;
      this.user.phoneOthers = this.displayUser.phoneOthers;
      this.user.checkboxUser = this.displayUser.checkboxUser ?? false;
      this.user.email = this.displayUser.email;
      this.user.phone = this.displayUser.phone;
      this.user.checkboxUser = this.displayUser.checkboxUser;
    },

    setDataInDynamicMode() {
      // this.user.checkboxMerchant =
      //   this.displayDynamicToken.mode === this.api_with_expense;
      this.user.checkboxMerchant = false;
      this.user.birthdate =
        parsingDate(this.displayDynamicToken.birthdate) ||
        parsingDate(this.displayUser.birthdate);
      this.user.email =
        this.displayDynamicToken.email ?? this.displayUser.email;
      this.user.email =
        this.displayDynamicToken.email ?? this.displayUser.email;
      this.user.email =
        this.displayDynamicToken.email ?? this.displayUser.email;
      this.user.phone =
        this.displayDynamicToken.phone ?? this.displayUser.phone;
      this.user.checkboxUser = this.displayUser.checkboxUser ?? false;
    },

    //clear input
    clearInputError(fieldName, clearAll = false) {
      if (this.fieldErrorsByType[fieldName])
        this.fieldErrorsByType[fieldName] = undefined;

      if (true === clearAll) this.fieldErrorsByType = [];

      if (fieldName === "birthdate") addDynamicSlashes();

      this.messageForStatusEmailAndSms = "";
    },

    verifyFormInBack(data) {
      if (!data.status && data.content) {
        let tempArr = [];

        data.content.errors.forEach((elt) => {
          tempArr[elt.type] = elt.message;
        });
        this.fieldErrorsByType = tempArr;
      }
      this.goToError();
    },

    goToError() {
      Object.keys(this.fieldErrorsByType).forEach((elt) => {
        if (elt.includes("checkboxUser"))
          this.scrollToElement("checkboxUserErrors");
        if (elt.includes("checkboxMerchants"))
          this.scrollToElement("checkboxMerchantsErrors");
        else if (elt.includes("email")) this.scrollToElement("email");
        else if (elt.includes("phone")) this.scrollToElement("phone");
        else if (elt.includes("firstname")) this.scrollToElement("firstname");
        else if (elt.includes("lastname")) this.scrollToElement("lastname");
        else if (elt.includes("birthdate")) this.scrollToElement("birthdate");
        else this.scrollToElement("email");
      });
    },

    goToErrorSmsAndEmail() {
      this.scrollToElement("messageForSmsAndEmail");
    },

    scrollToElement(value) {
      document.getElementById(value).scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="text"]:disabled {
  background: #ccc;
}
</style>
