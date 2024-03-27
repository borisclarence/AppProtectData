<template>
  <div>
    <input type="checkbox" class="demo2" id="demo2" />
    <label for="demo2">Démo 2</label>
  </div>
</template>

<script>
export default {
  name: "AppCheckboxSquare",
};
</script>

<style lang="scss" scoped>
input[type="checkbox"].demo2 {
  display: none;
}
input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #00b7e8;
  //padding: 0 0.6rem;
  margin-right: 0.3rem;
  box-sizing: border-box;
  display: inline-block;
  width: 1rem;
  height: 1rem;
}
input[type="checkbox"].demo2:checked + label::before {
  background-color: #00b7e8;
}
</style>
