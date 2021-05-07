  // DetailRow.vue
  <template>
  <div @click="onClick">
    <!-- <div class="inline field">
      <label>Name: </label>
      <span>{{ rowData.name }}</span>
    </div>
    <div class="inline field">
      <label>འབྲེལ་ལམ། </label>
      <span>{{ rowData.contact }}</span>
    </div>
    <div class="inline field">
      <label>སྐྱེས་སྐར། </label>
      <span>{{ rowData.birthDate }}</span>
    </div>

    <div class="inline field">
      <label>ཕོ་མོ། </label>
      <span>{{ rowData.gender }}</span>
    </div>
    <div class="inline field">
      <label>རྫོང་། </label>
      <span>{{ rowData.resideCounty }}</span>
    </div> -->
    <div class="inline field">
      <label>ཨང་རྟགས། </label>
      <span>{{ rowData.id }}</span>
    </div>
    <div class="inline field">
      <label>སློབ་གྲྭ </label>
      <span>{{ rowData.school }}</span>
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
      console.log("my-detail-row: on-click", event.target);
    },
  },
};
</script>