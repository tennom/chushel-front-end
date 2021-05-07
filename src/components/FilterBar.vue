  // FilterBar.vue

  <template>
  <!-- <div class="w3-container"> -->
  <form class="w3-container w3-padding">
    <input
      type="text"
      v-model="filterText"
      id="inline-block"
      class="w3-input w3-padding w3-border"
      @keydown.enter.prevent="doFilter"
      placeholder="འཚོལ་དགོས་པའི་མིང་འཇུག་རོགས།"
      size="20"
    />
    <button type="button" class="w3-button onyx" @click="doFilter">
      <i class="fa fa-search"></i>
    </button>
    <button type="button" class="w3-button onyx" @click="resetFilter">
      གཙང་སེལ།
    </button>
  </form>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
    };
  },
  methods: {
    doFilter() {
      this.$events.fire("filter-set", this.filterText);
      //   console.log("doFilter:", this.filterText);
    },
    resetFilter() {
      this.filterText = "";
      this.$events.fire("filter-reset");
      //   console.log("resetFilter");
    },
  },
};
</script>
<style scoped>
form {
  display: inline-block;
  width: fit-content;
}
#inline-block {
  display: inline-block;
  width: fit-content;
  line-height: normal;
  /* text-align: center; */
  /* color: #2c3e50; */
}
</style>