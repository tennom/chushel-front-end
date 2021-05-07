<template>
  <div id="visions">
    <component v-bind:is="currentCompnt" v-bind="currentProps"></component>
    <!-- <my-vuetable v-bind="currentProps"></my-vuetable> -->
  </div>
</template>

<script>
import Vue from "vue";
import visionFields from "@/components/visionFields.js";
import visionsTable from "@/components/MyVuetable";
import visionActions from "@/components/visionActions";
import visionDetailRow from "@/components/VisionDetailRow";
// Vue.component("visions-table", visionsTable);
// Vue.component("vision-actions", visionActions);
Vue.component("vision-detail-row", visionDetailRow);

export default {
  name: "visions-table",
  components: {
    visionsTable,
    visionActions,
  },
  props: {
    patient: {
      type: Object,
      default() {
        return {
          name: "",
          gender: "",
          birthDate: "",
          resideCounty: "",
        };
      },
    },
  },

  data() {
    var queryParam = {};
    if (this.patient.id !== undefined) {
      queryParam.userId = this.patient.id;
    }

    return {
      currentCompnt: "visionsTable",
      vuetableRef: "visionVuetable",
      moreParams: queryParam,
      // vision: this.vision,
      action: "",
    };
  },
  computed: {
    currentProps: function () {
      if (this.currentCompnt === "visionsTable") {
        return {
          vuetableRef: this.vuetableRef,
          "api-url": "http://localhost:8081/api/visions/",
          fields: visionFields,
          "append-params": this.moreParams,
          "query-params": { page: "page", perPage: "size" },
          "detail-row-component": "vision-detail-row",
          patient: this.patient,
        };
      } else if (this.currentCompnt === "visionActions") {
        return {
          patient: this.patient,
          vision: this.vision,
          action: this.action,
        };
      }
    },
  },
  mounted() {
    this.$events.$on("edit-vision", (visionData) => {
      this.vision = visionData;
      this.patient.id = visionData.userId;
      this.currentCompnt = "visionActions";
      // needed for baseComponent in visionActions
      this.action = "edit-vision";
    });

    // this.$events.$on("delete-vision", (visionData) => {
    //   // this.vision = visionData;
    //   console.log(
    //     "Vision id of ",
    //     visionData.id,
    //     " of ",
    //     visionData.userId,
    //     " is deleted....."
    //   );
    // });

    this.$events.$on("visions", (e) => {
      this.currentCompnt = "visionsTable";
    });
  },
};
</script>

<style>
#visions {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
