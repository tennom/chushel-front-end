<template>
  <div id="vision-form" class="w3-container">
    <div class="w3-card-4 w3-margin">
      <patient-info
        :patient="patient"
        :header-title="getHeaderTitle(action)"
        :base-component="baseComponent"
        :vision-id="visionId"
      ></patient-info>

      <div v-if="!submitted">
        <table class="w3-table-all w3-border">
          <tr>
            <th></th>
            <th>Sphere</th>
            <th>Cylinder</th>
            <th class="w3-center">Axis</th>
            <th>Add</th>
            <th>Prism</th>
          </tr>
          <tr>
            <th scope="row">OD</th>
            <td>
              <input
                type="text"
                class="w3-border"
                v-model="vision.ODsphere"
                maxlength="5"
                size="5"
              />
            </td>
            <td>
              <input
                type="text"
                class="w3-border"
                v-model="vision.ODcylinder"
                maxlength="5"
                size="5"
              />
            </td>
            <td class="w3-center">
              <input
                type="text"
                class="w3-border"
                v-model="vision.ODaxis"
                maxlength="5"
                size="5"
              />
            </td>
            <td id="rowspan-center" rowspan="2">
              <input
                type="text"
                class="w3-border"
                v-model="vision.add"
                maxlength="5"
                size="5"
              />
            </td>
            <td class="w3-center">
              <input
                type="text"
                class="w3-border"
                v-model="vision.ODprism"
                maxlength="5"
                size="5"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">OS</th>
            <td>
              <input
                type="text"
                class="w3-border"
                v-model="vision.OSsphere"
                maxlength="5"
                size="5"
              />
            </td>
            <td>
              <input
                type="text"
                class="w3-border"
                v-model="vision.OScylinder"
                maxlength="5"
                size="5"
              />
            </td>
            <td class="w3-center">
              <input
                type="text"
                class="w3-border"
                v-model="vision.OSaxis"
                maxlength="5"
                size="5"
              />
            </td>
            <td class="w3-center">
              <input
                type="text"
                class="w3-border"
                v-model="vision.OSprism"
                maxlength="5"
                size="5"
              />
            </td>
          </tr>
        </table>
        <button type="button" @click="saveVision" class="w3-button w3-amber">
          save
        </button>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="w3-button w3-amber" @click="newVision">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../http/services/dataService";
import Vue from "vue";
import PatientInfo from "./patientInfo";

export default {
  name: "vision-actions",
  components: {
    PatientInfo,
  },
  props: {
    patient: {
      type: Object,
      default() {
        return {};
      },
      // required: true,
    },
    vision: {
      type: Object,
      // required: true,
      default() {
        return {};
      },
    },
    action: {
      type: String,
      default() {
        return "";
      },
    },
    visionId: {
      type: Number,
      default() {
        if (this.vision.id === undefined) {
          return -1;
        } else {
          return this.vision.id;
        }
      },
    },
    baseComponent: {
      type: String,
      default() {
        switch (this.action) {
          case "edit-vision":
            return "visions";

            break;
          case "delete-vision":
            return "visions";
            break;
          default:
            return "patients";
            break;
        }
      },
    },
  },
  data() {
    return {
      // vision: this.vision,
      submitted: false,
      // "base-component": this.baseComponent,
      // locale,
    };
  },
  methods: {
    saveVision() {
      var data = {
        userId: this.patient.id,
        ODsphere: this.vision.ODsphere,
        ODcylinder: this.vision.ODcylinder,
        ODaxis: this.vision.ODaxis,
        ODprism: this.vision.ODprism,
        add: this.vision.add,
        OSsphere: this.vision.OSsphere,
        OScylinder: this.vision.OScylinder,
        OSaxis: this.vision.OSaxis,
        OSprism: this.vision.OSprism,
      };

      DataService.create("visions", data)
        .then((response) => {
          this.vision.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newVision() {
      this.submitted = false;
      this.vision = {
        ODsphere: "",
        ODcylinder: "",
        ODaxis: "",
        ODprism: "",
        add: "",
        OSsphere: "",
        OScylinder: "",
        OSaxis: "",
        OSprism: "",
      };
    },
    backToPatients() {
      this.$events.fire("back-to-patients");
    },
    getHeaderTitle(action) {
      switch (action) {
        case "edit-vision":
          return "མཐོང་ནུས་སྒྱུར་བཅོས་བྱེད་པ།";
          break;
        case "add-vision":
          return "མཐོང་ནུས་གསར་པ་ཁ་སྣོན།";
          break;
        case "delete-vision":
          return "མཐོང་ནུས་འདི་གསུབ་བཞིན་ཡོད།";
        default:
          return "མཐོང་ནུས་རེའུ་མིག";
          break;
      }
    },
  },
};
</script>

<style scoped>
#vision-form {
  max-width: 600px;
  margin: auto;
}

table td,
table td input,
table th {
  padding: 8px 8px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
/* form label,
form input {
  display: inline-block;
} */
</style>