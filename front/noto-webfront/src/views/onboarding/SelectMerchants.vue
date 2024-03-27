<template>
  <div v-if="showPage" class="device-inset__container">
    <div v-if="!isLoading" class="device-inset__content">
      <div v-if="!url_sign" class="selectMerchants">
        <div class="selectMerchants-wrapper">
          <div class="selectMerchants-content">
            <header-steps
              @event="toggleEvent"
              :countStep="countStep"
              :mode="token.mode"
              :page="page"
            />

            <div class="selectMerchants-section">
              <div class="selectMerchants-title mr-auto">
                {{ data.selectMerchants.title }}
              </div>

              <span id="display_error" class="selectMerchants-errors"></span>
              <div class="selectMerchants-subtitle">
                <template
                  v-if="
                    currentRoute.includes('dyn') &&
                    this.displayDynamicToken.mode === api_expense
                  "
                >
                  {{ data.selectMerchants.subtitleWithExpense }}
                </template>
                <template v-else>
                  {{ data.selectMerchants.subtitleWithoutExpense }}
                </template>
              </div>

              <div
                class="selectMerchants-globalCategories"
                v-if="displayDynamicToken.mode === api_expense"
              >
                <div v-if="root" class="selectMerchants-listAllCategories">
                  <app-checkbox-recursif
                    v-if="root.name"
                    :item="root"
                    :total="totalMerchants"
                    @change="onChange"
                    typeCheckbox="globalToggle"
                    class="selectMerchants-newCountAllMerchants"
                  />

                  <div
                    v-for="group in root.children"
                    :key="group.id"
                    class="selectMerchants-toggleParent"
                  >
                    <div
                      @click="group.isOpen = !group.isOpen"
                      class="selectMerchants-contentToggleParent"
                    >
                      <app-checkbox-recursif
                        :item="group"
                        @change="onChange"
                        typeCheckbox="toggle"
                      />

                      <button>
                        <div class="selectMerchants-textMerchantSelectedCount">
                          {{
                            getCountSelectedMerchantByCategory(group.name)
                          }}/{{ group.children.length }}
                        </div>
                        <img
                          class="ml-2 selectMerchants-icon"
                          :class="{
                            active: group.isOpen,
                          }"
                          src="../../assets/img/Icon ionic-ios-arrow-dropdown.png"
                          alt=""
                          srcset=""
                        />
                      </button>
                    </div>

                    <div
                      v-if="group.isOpen"
                      class="selectMerchants-listMerchants"
                    >
                      <div
                        v-for="item in group.children"
                        :key="item.id"
                        class="selectMerchants-spaceMerchantList"
                      >
                        <app-checkbox-recursif
                          :item="item"
                          @change="onChange"
                          typeCheckbox="child"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <app-loader :isSign="true" v-else />
              </div>

              <div class="selectMerchants-globalCategories" v-else>
                <div v-if="root" class="selectMerchants-listAllCategories">
                  <div
                    v-for="group in root.children"
                    :key="group.id"
                    class="selectMerchants-toggleParent"
                  >
                    <div @click="group.isOpen = !group.isOpen">
                      <div
                        class="selectMerchants-oneMerchantWithoutExpense"
                        :class="{
                          active: group.isOpen,
                        }"
                      >
                        <div class="selectMerchants-oneMerchantText">
                          {{ group.name }}
                        </div>

                        <button>
                          <div
                            class="selectMerchants-textMerchantSelectedCount"
                          >
                            {{
                              getCountSelectedMerchantByCategory(group.name)
                            }}/{{ group.children.length }}
                          </div>

                          <img
                            class="ml-2 selectMerchants-icon"
                            :class="{
                              active: group.isOpen,
                            }"
                            src="../../assets/img/Icon ionic-ios-arrow-dropdown.png"
                            alt=""
                            srcset=""
                          />
                        </button>
                      </div>
                    </div>

                    <div
                      v-if="group.isOpen"
                      class="selectMerchants-listMerchants"
                    >
                      <div
                        v-for="item in group.children"
                        :key="item.id"
                        class="selectMerchants-spaceMerchantList"
                      >
                        <app-checkbox-recursif
                          :item="item"
                          @change="onChange"
                          typeCheckbox="child"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer class="selectMerchants-footer">
              <button class="selectMerchants-button" @click="selectMerchants">
                <span class="text-white-600">
                  {{ data.selectMerchants.buttonText }}
                </span>
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 selectMerchants-iconArrow"
                />
              </button>
            </Footer>
          </div>
        </div>

        <app-modal-confirm-sign
          v-show="showConfirm"
          @closeModalConfirm="cancelModal"
          @confirmSignMandats="signMandat()"
        />

        <app-modal-stop-enrolment
          v-show="show"
          @closeModal="modalStopEnrolment"
        />

        <app-modal-no-merchants-selected
          v-show="showNoMerchantsSelected"
          @closeModalNoMerchant="modalNoMerchantsSelected"
        />
      </div>
      <div v-else>
        <app-iframe :url_sign="url_sign" />
      </div>
    </div>
    <app-loader v-else />
  </div>

  <app-error-session v-else />
</template>

<script>
import $ from "jquery";
import onboarding from "../../assets/json/onboarding_text.json";
import { mapGetters } from "vuex";
import {
  GET_MERCHANTS,
  SET_MERCHANTS_CHECKED,
} from "../../store/modules/merchants";
import { SIGN_MANDATS, SET_COUNTER } from "../../store/modules/users";
import { GET_DYNAMIC_TOKEN } from "../../store/modules/partners";
import { MODE_API, MODE_STANDALONE } from "../../assets/js/constants.js";
import HeaderSteps from "@/components/Header/HeaderSteps.vue";
import Footer from "@/components/Footer/Footer.vue";

import AppModalStopEnrolment from "@/components/Modal/AppModalStopEnrolment.vue";
import AppModalConfirmSign from "@/components/Modal/AppModalConfirmSign.vue";

import AppModalNoMerchantsSelected from "@/components/Modal/AppModalNoMerchantsSelected.vue";
import AppLoader from "@/components/Loader/AppLoader.vue";
import AppIframe from "@/components/frame/AppIframe.vue";
import AppErrorSession from "@/components/Message/Error/AppErrorSession.vue";
import AppCheckboxRecursif from "@/components/Inputs/Checkbox/AppCheckboxRecursif.vue";

export default {
  name: "SelectMerchants",
  components: {
    HeaderSteps,
    Footer,
    AppModalStopEnrolment,
    AppModalConfirmSign,
    AppModalNoMerchantsSelected,
    AppLoader,
    AppIframe,
    AppErrorSession,
    AppCheckboxRecursif,
  },

  async mounted() {
    this.$router.currentRoute.path.includes("dyn")
      ? await this.dynamicTokenPartner(MODE_API)
      : await this.dynamicTokenPartner(MODE_STANDALONE);

    await this.allMerchants();

    this.countStep = this.token.mode !== 0 ? this.countStep : 3;
    this.page = this.token.mode !== 0 ? this.page : 3;

    if (
      //this.$router.currentRoute.path.includes("dyn") &&
      this.$route.query.isAllSelected === "true"
    ) {
      // await this.allSelected();
      this.getRecursiveList(true);
      this.onChange(this.root, true);
    } else {
      this.getRecursiveList(false);
      this.onChange(this.root, false);
    }

    this.getListMerchants();
  },

  data() {
    return {
      visible: false,
      show: false,
      showNoMerchantsSelected: false,

      loading: false,

      checkSelected: [],
      checkSelectedAllCategories: [],
      selectAll: false,
      selectAllCategories: false,

      allchecked: false,
      value: 1,

      showConfirm: false,
      url_sign: null,
      isLoading: false,
      isLoadingMini: false,
      checkStatus: this.$route.query.isAllSelected,

      errors: [],
      itemMerchants: [],
      selectMerchantIds: [],
      categoryIds: [],
      listChecked: [],

      token: {},

      currentListMerchants: null,

      isOpen: false,

      countStep: 2,
      page: 2,
      totalMerchants: 0,
      totalMerchantsByCategory: 0,
      totalSelectedMerchants: 0,

      root: null,

      api_expense: MODE_API,
      data: onboarding,
    };
  },

  computed: {
    ...mapGetters([
      "displayMerchants",
      "displayKeepChecked",
      "displayUser",
      "displayDynamicToken",
    ]),
    showPage() {
      return this.displayDynamicToken && this.displayDynamicToken.authorization
        ? this.displayDynamicToken.authorization
        : false;
    },
    currentUser() {
      return this.displayUser;
    },
    currentRoute() {
      return this.$router.currentRoute.path;
    },
    isAllSelected() {
      return this.$route.query.isAllSelected;
    },
  },

  methods: {
    //modal
    toggleEvent(event) {
      if (event.modalStop) this.modalStopEnrolment();

      if (event.prevViewPage) this.prevEditUser();
    },

    showIcon() {
      this.visible = !this.visible;
    },

    modalStopEnrolment() {
      this.show = !this.show;
    },

    modalConfirmSign() {
      this.showConfirm = !this.showConfirm;
    },

    modalNoMerchantsSelected() {
      this.showNoMerchantsSelected = !this.showNoMerchantsSelected;
    },

    // routes
    addRouterForPrevPage(token, pref_mode) {
      this.$router.push("/editUser/" + pref_mode + "/" + token);
    },

    prevEditUser() {
      this.$router.currentRoute.path.includes("dyn")
        ? this.addRouterForPrevPage(this.$route.params.access_id, "dyn")
        : this.addRouterForPrevPage(this.$route.params.access_id, "sta");
    },

    async signMandat() {
      if (this.checkSelected.length === 0) {
        $("#display_error").html("Aucun marchant n'a été sélectionné");
      } else {
        this.isLoading = true;
        // const mode_app = this.$router.currentRoute.path.includes("dyn") ? 1 : 0;
        const mode_app = this.token.mode;

        try {
          const data = await this.$store.dispatch(SIGN_MANDATS, {
            list_merchants: this.checkSelected,
            token: this.$route.params.access_id,
            /* mode */
            mode: mode_app,
          });

          if (data.status) {
            this.url_sign = data.urlSign;

            // if (this.displayCounter >= 1) this.$store.commit(SET_COUNTER, 0);
            this.$store.commit(SET_COUNTER, 0);
          } else this.errors.push(data.message);

          this.isLoading = false;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
      }
    },

    cancelModal() {
      this.showConfirm = false;
    },

    async selectMerchants() {
      this.getMerchants();

      if (this.checkSelected.length !== 0) {
        this.$store.commit(SET_MERCHANTS_CHECKED, this.checkSelected);
        this.modalConfirmSign();
      } else this.modalNoMerchantsSelected();
    },

    async allMerchants() {
      this.isLoading = true;

      try {
        this.currentListMerchants = await this.$store.dispatch(GET_MERCHANTS, {
          token: this.$route.params.access_id,
        });

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    async dynamicTokenPartner(mode) {
      this.token = await this.$store.dispatch(GET_DYNAMIC_TOKEN, {
        token: this.$route.params.access_id,
        mode,
      });
    },

    // Check all merchants by category
    checkAllCategories(data) {
      this.selectAllCategories = !this.selectAllCategories;
      this.selectAll = !this.selectAll;

      this.checkSelected = [];
      if (this.selectAllCategories) {
        for (let i in data) {
          this.checkSelectedAllCategories.push(data[i].name);

          for (let j in data[i].merchants) {
            this.checkSelected.push(data[i].merchants[j]);
          }
        }
      }
    },

    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },

    countCategorySelected(value, total) {
      return value + (value - total);
    },

    getRecursiveList(status = false) {
      let value = 1;

      this.root = {
        name: "Tous les marchands",
        checked: status,
        children: this.displayMerchants.map((cat) => ({
          id: value++,
          name: cat.name,
          checked: status,
          isOpen: false,

          children: cat.merchants.map((merchant) => ({
            id: merchant.id,
            name: merchant.name,
            ref: merchant.ref,
            checked: status,
          })),
        })),
      };
    },

    onChange(node, checked) {
      node.checked = checked;

      this.updateChildren(node, checked);
      this.updateTree();
    },

    updateChildren(node, checked) {
      if (!node.children) return;

      node.children.forEach((child) => {
        child.checked = checked;
        this.updateChildren(child, checked);
      });
    },

    updateTree() {
      (function update(node) {
        if (!node.children) return;

        node.children.forEach(update);
        node.checked = node.children.every((child) => child.checked);
      })(this.root);
    },

    getMerchants() {
      this.root.children.map((children) => {
        this.checkSelected = children.children.filter((child) => {
          return child.checked === true;
        });
      });

      return this.checkSelected;
    },

    getListMerchants() {
      let countParent = 0;
      let countChild = 0;

      for (let i in this.displayMerchants) {
        countParent++;
        for (let j in this.displayMerchants[i].merchants) {
          countChild++;
          this.displayMerchants[i].merchants[j].id;
        }
      }

      this.totalMerchants =
        countParent + countChild - this.displayMerchants.length;
    },

    getCountSelectedMerchantByCategory(name) {
      let countOneChild = 0;

      this.root.children.map((children) => {
        if (children.name === name) {
          children.children.map((child) => {
            if (child.checked) countOneChild++;
          });
        }
      });

      return countOneChild;
    },
  },
};
</script>
