import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/scss/index.scss";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { faCircleChevronDown } from "@fortawesome/free-regular-svg-icons";

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import $ from "jquery";
import infiniteScroll from "vue-infinite-scroll";

import {
  hideItemsOnCollapseOpened,
  checkAllCheckboxListOnClick,
  checkAllCategories,
  onCheckboxSwipe,
} from "@/assets/js/form";

import i18n from "./i18n";
$(function () {
  hideItemsOnCollapseOpened(".marchand-list");
  checkAllCheckboxListOnClick(
    '[data-action="check-category"]',
    ".marchand-list__item__content",
    ".checkbox-container"
  );
  checkAllCategories(
    '[data-action="check-all"] input',
    '[data-action="check-category"] input'
  );
  onCheckboxSwipe();
});

/* add icons to the library */
library.add(
  faXmark,
  faArrowLeft,
  faArrowRight,
  faArrowCircleUp,
  faArrowCircleDown,
  faCircleChevronUp,
  faCircleChevronDown,
  faCircleNotch,
  faExclamationCircle
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(infiniteScroll);

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
