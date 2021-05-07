<template>
  <div>
    <header
      class="w3-container w3-cell-row w3-padding"
      v-bind:class="selectColor(action)"
    >
      <back-arrow
        v-if="action.slice(0, 6) != 'delete'"
        :base-component="getBaseComponent(action)"
      ></back-arrow>

      <div class="w3-cell w3-cell-middle">
        <h3>{{ headerTitle }}</h3>
      </div>
    </header>
    <slot name="patientData">
      <div class="w3-container w3-cell-row w3-margin">
        <div
          v-if="validValue(patient.name) > 0"
          class="w3-container w3-cell w3-mobile w3-margin"
        >
          <label class="w3-text-brown">མིང་།</label>
          <input
            type="text"
            v-model="patient.name"
            class="w3-border-0 line-height-bo w3-center"
            size="12"
            disabled
          />
        </div>
        <div
          v-if="validValue(patient.gender)"
          class="w3-container w3-cell w3-mobile w3-margin"
        >
          <label class="w3-text-brown">ཕོ་མོ།</label>
          <input
            type="text"
            v-model="patient.gender"
            class="w3-border-0 w3-center"
            size="5"
            disabled
          />
        </div>
        <div
          v-if="validValue(patient.birthDate) > 0"
          class="w3-container w3-cell w3-mobile w3-margin"
        >
          <label class="w3-text-brown">སྐྱེས་སྐར།</label>
          <input
            type="text"
            v-model="patient.birthDate"
            class="w3-border-0 w3-center"
            size="10"
            disabled
          />
        </div>

        <div
          v-if="validValue(patient.resideCounty)"
          class="w3-container w3-cell w3-mobile w3-margin"
        >
          <label class="w3-text-brown">རྫོང་།</label>
          <input
            type="text"
            v-model="patient.resideCounty"
            class="w3-border-0 line-height-bo w3-center"
            size="12"
            disabled
          />
        </div>
        <div
          v-if="validValue(patient.id)"
          class="w3-container w3-cell w3-mobile w3-margin"
        >
          <label class="w3-text-brown">ནད་པའི་ཨང་རྟགས།</label>
          <input
            type="text"
            v-model="patient.id"
            class="w3-border-0 w3-center"
            size="6"
            disabled
          />
        </div>
      </div>
    </slot>
  </div>
</template>  
<script>
import { relativeTimeRounding } from "moment";
import backArrow from "./backNav";
import { validValue } from "./utils";
export default {
  name: "patient-info",
  components: {
    backArrow,
  },
  props: {
    patient: {
      type: Object,
      required: true,
    },
    headerTitle: {
      type: String,
      default() {
        return "";
      },
    },
    action: {
      type: String,
      default: "",
    },

    baseComponent: {
      type: String,
      default: "patients",
    },
  },

  methods: {
    selectColor(action) {
      if (action.slice(-7) === "patient") {
        return {
          onyx: true,
        };
      } else {
        return {
          "w3-amber": true,
        };
      }
    },
    validValue,
    getBaseComponent(action) {
      switch (action) {
        case "view-vision":
          return "visions";
        case "edit-vision":
          return "visions";
        case "delete-vision":
          return "visions";
        default:
          return "patients";
      }
    },
  },
};
</script>
<style scoped>
header {
  min-height: 68px;
}
.line-height-bo {
  line-height: normal;
}
</style>
  
