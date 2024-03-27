<template>
  <div style="margin-top: 35px; margin-left: 20px">
    <div v-if="root">
      <app-checkbox-recursif
        :item="root"
        @change="onChange"
        typeCheckbox="globalToggle"
      />

      <div
        v-for="group in root.children"
        :key="group.id"
        style="margin-top: 15px; margin-left: 20px; background: #e6dcdc"
      >
        <app-checkbox-recursif
          :item="group"
          @change="onChange"
          typeCheckbox="toggle"
        />

        <div
          v-for="item in group.children"
          :key="item.id"
          style="margin-left: 20px"
        >
          <app-checkbox-recursif
            :item="item"
            @change="onChange"
            typeCheckbox="child"
          />
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />

    <h1>Cats</h1>

    <div class="uiTest">
      <div class="uiTest-container">
        <ul class="uiTest-group" @scroll="loadMore">
          <li class="uiTest-item" v-for="(item, index) in items" :key="item">
            Item {{ index }}
          </li>
        </ul>

        <transition name="fade">
          <p v-if="loading">Loading</p>
        </transition>
      </div>
    </div>

    <label class="switch">
      <input type="checkbox" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
import AppCheckboxRecursif from "@/components/Inputs/Checkbox/AppCheckboxRecursif.vue";

export default {
  name: "UiTest",

  components: { AppCheckboxRecursif },

  data() {
    return {
      page: 1,
      itemsPerPage: 20,
      loading: false,

      root: null,

      cats: [
        {
          id: 1,
          name: "Norwegian Forest Cat",
          merchants: [
            {
              id: 1.1,
              name: "Eleniam",
              isMerchantSelected: false,
            },
            {
              id: 1.2,
              name: "Serionat",
              isMerchantSelected: false,
            },
          ],
          isCategorySelected: false,
        },
        {
          id: 2,
          name: "Maine Coon",
          merchants: [
            { id: 2.1, name: "Ropenhad", isMerchantSelected: false },
            { id: 2.2, name: "Denem", isMerchantSelected: false },
          ],
          isCategorySelected: false,
        },
        {
          id: 3,
          name: "Munchkin",
          merchants: [
            { id: 3.1, name: "Erdisem", isMerchantSelected: false },
            { id: 3.2, name: "Uzdeniem", isMerchantSelected: false },
          ],
          isCategorySelected: false,
        },
      ],
      isAllSelected: false,
      isAllMerchantSelected: false,

      selectedCatIds: [],
      selectMerchantIds: [],
    };
  },

  created() {
    this.root = {
      name: "Select All",
      checked: false,
      children: this.cats.map((cat) => ({
        id: cat.id,
        name: cat.name,
        checked: false,

        children: cat.merchants.map((merchant) => ({
          merchant,
          id: merchant.id,
          name: merchant.name,
          checked: false,
        })),
      })),
    };
  },

  computed: {
    items() {
      return this.page * this.itemsPerPage;
    },
  },

  methods: {
    loadMore(e) {
      let { scrollTop, clientHeight, scrollHeight } = e.target;

      if (!this.loading && scrollTop + clientHeight >= (scrollHeight * 4) / 5) {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this.loading = false;
        }, 1000);
      }
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
      for (let i in this.root.children) {
        for (let j in this.root.children[i].children) {
          if (this.root.children[i].children[j].checked)
            this.selectMerchantIds.push(
              this.root.children[i].children[j].merchant
            );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uiTest {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 150px 0;

  &-container {
    position: relative;
  }

  &-group {
    width: 300px;
    max-height: 300px;
    overflow-y: scroll;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.2);
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

ul {
  list-style: none;
}
input {
  margin-right: 0.5em;
}
</style>
