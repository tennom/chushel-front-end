<template>
  <div>
    <button
      class="w3-button w3-blue-grey w3-tiny w3-round"
      @click="itemAction('delete-patient', rowData, rowIndex)"
    >
      <i class="fa fa-minus"></i>
    </button>
    <div class="w3-modal" v-show="show">
      <div class="w3-modal-content w3-card-4 w3-animate-top">
        <header class="w3-container w3-teal">
          <p>Be careful, you are about to delete...</p>
        </header>
        <div class="w3-container">
          <p>Some text..</p>
          <p>Some text..</p>
        </div>
        <footer class="w3-container w3-teal">
          <button class="w3-button" @click="close">close</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-modal",
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close: function () {
      this.$emit("close-modal");
    },
  },
};
</script>