<template>
  <div class="selectMerchants-merchants" v-if="displayMerchants">
    <div
      class="selectMerchants-countAllMerchants"
      :class="{
        isBordered: displayDynamicToken.mode === api_expense,
      }"
    >
      <template v-if="displayDynamicToken.mode === api_expense">
        <app-checkbox-toggle-all
          class="selectMerchants-titleCountMerchants"
          v-model="selectAllCategories"
          :isAllSelectedCategories="selectAllCategories"
          @checkAllCategories="checkAllCategories(displayMerchants)"
        >
          Tous les marchands
        </app-checkbox-toggle-all>
        <sup>({{ displayMerchants.length }})</sup>
      </template>
      <div v-else class="selectMerchants-titleCountMerchants"></div>
    </div>

    <ul
      class="selectMerchants-listAllCategories"
      :class="{
        heightMerchant: displayDynamicToken.mode === api_expense,
      }"
    >
      <li
        v-for="(data, index) in displayMerchants"
        :key="index"
        ref="datas"
        class="selectMerchants-listMerchants"
      >
        <div
          @click="toggleAccordion"
          v-if="displayDynamicToken.mode === api_expense"
        >
          <app-checkbox-toggle-props
            class="selectMerchants-oneMerchant"
            :class="{
              active: isOpen,
            }"
            v-model="selectAll"
            :checked="isAllSelected"
            :isSelectedCategory="selectAll"
            @checkCategory="checkAllMerchants(data.merchants, data.name)"
          >
            <div class="selectMerchants-oneMerchantText">
              {{ data.name }}
            </div>

            <button>
              <div class="selectMerchants-textMerchantSelectedCount">
                {{ checkSelected.length }}/{{ data.merchants.length }}
              </div>
              <img
                class="ml-2 selectMerchants-icon"
                :class="{
                  active: isOpen,
                }"
                src="../../assets/img/Icon ionic-ios-arrow-dropdown.png"
                alt=""
                srcset=""
              />
            </button>
          </app-checkbox-toggle-props>
        </div>

        <div @click="toggleAccordion" v-else>
          <div
            class="selectMerchants-oneMerchantWithoutExpense"
            :class="{
              active: isOpen,
            }"
          >
            <div class="selectMerchants-oneMerchantText">
              {{ data.name }}
            </div>

            <button>
              <div class="selectMerchants-textMerchantSelectedCount">
                {{ checkSelected.length }}/{{ data.merchants.length }}
              </div>

              <img
                class="ml-2 selectMerchants-icon"
                :class="{
                  active: isOpen,
                }"
                src="../../assets/img/Icon ionic-ios-arrow-dropdown.png"
                alt=""
                srcset=""
              />
            </button>
          </div>
        </div>

        <ul
          class="selectMerchants-group"
          :id="`selectMerchants-list-${index}`"
          ref="selectMerchantsScroll"
          v-show="isOpen"
          :class="{
            addSpace: displayDynamicToken.mode === api_expense,
            heightMerchant: displayDynamicToken.mode === api_expense,
          }"
        >
          <li v-for="(item, index) in data.merchants" :key="index" ref="items">
            <label class="checkbox-container checkbox-container--blue">
              <input
                type="checkbox"
                :id="item.id"
                :value="item"
                v-model="checkSelected"
                @change="oneSelectMerchants(data.merchants, data.name)"
                class="option-merchant"
                checked="checked"
              />
              <span class="text">{{ item.name }}</span>
              <span class="checkmark light"></span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import AppCheckboxToggleProps from "@/components/Inputs/Checkbox/AppCheckboxToggleProps.vue";
import AppCheckboxToggleAll from "@/components/Inputs/Checkbox/AppCheckboxToggleAll.vue";

export default {
  name: "AppMerchant",

  components: {
    AppCheckboxToggleProps,
    AppCheckboxToggleAll,
  },
};
</script>
