<template>
  <div class="appListCategories-merchants" v-if="displayMerchants">
    <div class="appListCategories-countAllMerchants">
      <app-checkbox-toggle-all class="appListCategories-titleCountMerchants">
        Tous les marchands
      </app-checkbox-toggle-all>
      <sup>({{ displayMerchants.length }})</sup>
    </div>

    <ul>
      <li
        v-for="(data, index) in displayMerchants"
        :key="index"
        ref="datas"
        class="appListCategories-listMerchants"
      >
        <app-checkbox-toggle-props>
          <div>{{ data.name }}</div>

          <button @click="toggleAccordion">
            <font-awesome-icon
              class="ml-2 appListCategories-icon"
              icon="fa-solid fa-circle-chevron-down"
              :class="{
                active: isOpen,
              }"
            />
          </button>
        </app-checkbox-toggle-props>

        <ul
          class="appListCategories-group"
          id="appListCategories-list"
          ref="appListCategoriesScroll"
          v-show="isOpen"
        >
          <li v-for="(item, index) in data.merchants" :key="index" ref="items">
            <label class="checkbox-container checkbox-container--blue">
              <input
                type="checkbox"
                :id="item.id"
                :value="item"
                v-model="checkSelected"
                @change="oneAppListCategories"
                class="option-merchant"
                checked="checked"
              />
              <span class="text">{{ item.name }}</span>
              <span class="checkmark"></span>
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
  name: "AppListCategories",

  components: {
    AppCheckboxToggleProps,
    AppCheckboxToggleAll,
  },
};
</script>

<style lang="scss" scoped></style>
