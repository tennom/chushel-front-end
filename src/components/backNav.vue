<template>
  <div class="w3-cell w3-cell-middle">
    <button class="w3-button" @click="onBackNav">
      <i class="fa fa-arrow-left"></i>
    </button>
  </div>
</template>
<script>
export default {
  name: "back-arrow",
  props: {
    baseComponent: {
      type: String,
      required: true,
    },
  },
  methods: {
    onBackNav() {
      if (this.baseComponent.slice(-1) !== "s") {
        this.baseComponent += "s";
      }
      this.$events.fire(this.baseComponent);
    },
  },
};
</script>