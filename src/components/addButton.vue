<template>
  <!-- <div class="w3-cell"> -->
  <button class="w3-button onyx w3-tiny w3-round" @click="fireClick">
    <i class="fa fa-plus w3-medium w3-center"></i>
  </button>
  <!-- </div> -->
</template>
<script>
// import addPatient from "./addPatient";
export default {
  methods: {
    fireClick() {
      this.$events.fire("add-new-patient");
    },
  },
};
</script>