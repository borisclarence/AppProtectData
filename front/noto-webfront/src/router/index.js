import Vue from "vue";
import VueRouter from "vue-router";
import UiTest from "../views/UiTest.vue";
import ConfirmationCode from "../views/onboarding/ConfirmationCode.vue";
import WelcomePage from "../views/onboarding/WelcomePage.vue";
import EditUserInformation from "../views/onboarding/EditUserInformation.vue";
import SelectMerchants from "../views/onboarding/SelectMerchants.vue";
import OnboardingComplete from "../views/onboarding/OnboardingComplete.vue";

import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/ui",
    name: "UiTest",
    component: UiTest,
  },

  {
    path: "/confirmation/:mode/:access_id",
    name: "ConfirmationCode",
    component: ConfirmationCode,
  },

  {
    path: "/welcome/:mode/:access_id",
    name: "WelcomePage",
    component: WelcomePage,
  },

  {
    path: "/editUser/:mode/:access_id",
    name: "EditUserInformation",
    component: EditUserInformation,
  },

  {
    path: "/selectMerchants/:mode/:access_id",
    name: "SelectMerchants",
    component: SelectMerchants,
  },

  {
    path: "/complete/:mode",
    name: "OnboardingComplete",
    component: OnboardingComplete,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
