  // DetailRow.vue
  <template>
  <div @click="onClick">
    <div class="inline field">
      <label>སྤྱོད་མཁན་གྱི་ཨང་རྟགས། </label>
      <span>{{ rowData.userId }}</span>
    </div>
    <div class="inline field">
      <label>OD འཁོར་གནས། </label>
      <span>{{ rowData.ODaxis }}</span>
    </div>
    <div class="inline field">
      <label>OS འཁོར་གནས། </label>
      <span>{{ rowData.OSaxis }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailRowComponent",
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
    },
  },
  methods: {
    onClick(event) {
      console.log("vision detail: on-click", event.target);
    },
  },
};
</script>