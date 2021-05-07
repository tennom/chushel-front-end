<template>
  <div id="patients">
    <component
      v-bind:is="currentComponent"
      v-bind="currentProperties"
    ></component>
  </div>
</template>

<script>
import Vue from "vue";
import FieldsData from "@/components/FieldsData.js";
import patientsTable from "@/components/MyVuetable";
import DetailRow from "@/components/DetailRow";
import patientActions from "@/components/patientActions";
import visions from "@/views/Visions";
import visionActions from "@/components/visionActions";
Vue.component("my-detail-row", DetailRow);

export default {
  name: "patients-table",
  components: {
    patientsTable,
    visions,
    patientActions,
    visionActions,
  },
  data() {
    return {
      currentComponent: "patientsTable",
      vuetableRef: "patientTableRef",
      showAdd: true,
      patient: null,
      action: "",
      showToolbar: true,
    };
  },
  computed: {
    currentProperties: function () {
      switch (this.currentComponent) {
        case "patientsTable":
          return {
            vuetableRef: this.vuetableRef,
            "api-url": "http://localhost:8081/api/patients/",
            fields: FieldsData,
            "append-params": {},
            "query-params": { page: "page", perPage: "size" },
            "detail-row-component": "my-detail-row",
            "show-add": this.showAdd,
          };
          break;
        case "patientActions":
          let patientProps = {};
          if (this.action === "edit-patient") {
            patientProps.patient = this.patient;
          }
          patientProps.action = this.action;
          return patientProps;
          break;

        case "visionActions":
          return { patient: this.patient, action: this.action };
          break;

        case "visions":
          return {
            "show-toolbar": this.showToolbar,
            patient: this.patient,
          };
          break;
        default:
          return {};
      }
    },
  },
  mounted() {
    this.$events.$on("add-new-patient", (e) => {
      this.action = "add-patient";
      this.currentComponent = "patientActions";
    });

    this.$events.$on("edit-patient", (patientData) => {
      this.patient = patientData;
      let countyBundle = patientData.resideCounty;
      let state = "",
        county = "";
      if (countyBundle.length !== 0) {
        [state, county] = countyBundle.split("|");
      }
      this.patient.selectedState = state;
      this.patient.selectedCounty = county;
      // if (!isNaN(countyBundle) && countyBundle.length == 4) {
      //   this.patient.resideCounty = {
      //     state: countyBundle.slice(0, 3),
      //     county: countyBundle.slice(3, 6),
      //   };
      // }
      this.action = "edit-patient";
      this.currentComponent = "patientActions";
    });

    this.$events.$on(
      "patients",
      (e) => (this.currentComponent = "patientsTable")
    );

    this.$events.$on("add-vision", (patientData) => {
      // console.log("calling add vision in patient");
      this.patient = patientData;
      this.action = "add-vision";
      this.currentComponent = "visionActions";
    });

    this.$events.$on("view-visions", (patientData) => {
      this.patient = patientData;
      this.showToolbar = false;
      this.currentComponent = "visions";
    });

    // (this.currentComponent="addVision")
  },
};
</script>

<style>
#patients {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
