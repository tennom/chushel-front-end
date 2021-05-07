<template>
  <div id="vision-form" class="w3-container">
    <div class="w3-card-4 w3-margin">
      <patient-info
        :patient="getPatient()"
        :header-title="headerTitle"
        :action="action"
      >
        <template v-slot:patientData>
          <slot name="visionData"></slot>
        </template>
      </patient-info>

      <div v-if="action !== 'deleted-vision'">
        <div v-if="!submitted">
          <div class="w3-container w3-padding">
            <div
              v-if="validValue(vision.id)"
              class="w3-container w3-cell w3-mobile"
            >
              <label>མཐོང་ནུས་ཨང་རྟགས།</label>
              <input
                type="text"
                v-model="vision.id"
                class="w3-border-0"
                size="12"
                disabled
              />
            </div>
            <div class="w3-container w3-cell w3-mobile">
              <label>སྒྲིག་མཁན།</label>
              <select
                class="w3-select"
                name="physician"
                v-model="vision.physician"
                :disabled="disabled"
              >
                <option value="1">བསོད་རྡོ།</option>
                <option value="2">དོན་འགྲུབ།</option>
                <option value="3">ཕུར་བུ་དགྲ་འདུལ།</option>
                <option value="4">རིན་ཆེན།</option>
              </select>
            </div>
          </div>

          <table class="w3-table-all w3-padding w3-border">
            <tr>
              <th></th>
              <th>ཟླུམ་ཤེལ།</th>
              <th>ཀ་ཤེལ།</th>
              <th class="w3-center">འཁོར་གནས།</th>
              <th>བུ་གའི་བར་ཐག</th>
              <th>བཅོས་ཚད།</th>
              <th>Add</th>
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
                  :disabled="disabled"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.ODcylinder"
                  maxlength="5"
                  size="5"
                  :disabled="disabled"
                />
              </td>
              <td class="w3-center">
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.ODaxis"
                  maxlength="5"
                  size="5"
                  :disabled="disabled"
                />
              </td>
              <td id="rowspan-center" rowspan="2">
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.pd"
                  maxlength="3"
                  size="3"
                  :disabled="disabled"
                />
              </td>
              <td class="w3-center">
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.ODcorreted"
                  maxlength="5"
                  size="5"
                  :disabled="disabled"
                />
              </td>
              <td id="rowspan-center" rowspan="2">
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.add"
                  maxlength="3"
                  size="3"
                  :disabled="disabled"
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
                  :disabled="disabled"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.OScylinder"
                  maxlength="5"
                  size="5"
                  :disabled="disabled"
                />
              </td>
              <td class="w3-center">
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.OSaxis"
                  maxlength="5"
                  size="5"
                  :disabled="disabled"
                />
              </td>
              <td class="w3-center">
                <input
                  type="text"
                  class="w3-border"
                  v-model="vision.OScorrected"
                  maxlength="5"
                  size="5"
                  :disabled="disabled"
                />
              </td>
            </tr>
          </table>
          <button
            v-if="action !== 'delete-vision'"
            type="button"
            @click="onVisionButton"
            class="w3-button w3-amber"
          >
            {{ getLabel()["main"] }}
          </button>
          <div class="w3-container w3-padding">{{ message }}</div>
        </div>

        <div v-else>
          <!-- <div class="w3-container w3-padding">{{ message }}</div> -->
          <button
            v-if="action === 'edit-vision'"
            class="w3-button w3-amber"
            @click="reeditVision"
          >
            {{ getLabel()["second"] }}
          </button>
          <div class="w3-container w3-padding">{{ message }}</div>
        </div>
      </div>
    </div>
    <!-- </slot> -->
  </div>
</template>

<script>
import DataService from "../http/services/dataService";
import Vue from "vue";
import patientInfo from "./patientInfo";
import { validValue } from "./utils";

export default {
  name: "vision-actions",
  components: {
    patientInfo,
  },
  props: {
    vision: {
      type: Object,
      // required: true,
      default() {
        return {};
      },
    },
    patient: {
      type: Object,
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

    headerTitle: {
      type: String,
      default() {
        switch (this.action) {
          case "edit-vision":
            return "མཐོང་ནུས་སྒྱུར་བཅོས་བྱེད་པ།";
            break;
          case "add-vision":
            return "མཐོང་ནུས་གསར་པ་ཁ་སྣོན།";
            break;
          case "delete-vision":
            return "མཐོང་ནུས་འདི་གསུབ་བཞིན་ཡོད།";
          case "deleted-vision":
            return "མཐོང་ནུས་དེ་བསུབས་ཚར།";
          default:
            return "མཐོང་ནུས་རེའུ་མིག";
            break;
        }
      },
    },

    disabled: {
      type: Boolean,
      default() {
        switch (this.action) {
          case "delete-vision":
            return true;
            break;
          case "deleted-vision":
            return true;
          default:
            return false;
            break;
        }
      },
    },
  },
  data() {
    return {
      submitted: false,
      message: "",
      labels: { main: "", second: "" },
    };
  },

  methods: {
    // disabled() {
    //   console.log("---------------", this.action);
    //   switch (this.action) {
    //     case "delete-vision":
    //       return true;
    //       break;
    //     case "deleted-vision":
    //       return true;
    //     default:
    //       return false;
    //       break;
    //   }
    // },
    getLabel() {
      switch (this.action) {
        case "add-vision":
          this.labels.main = "ཁ་སྣོན།";
          return this.labels;
          break;
        case "edit-vision":
          this.labels.main = "བསྒྱུར་བཅོས།";
          this.labels.second = "བསྐྱར་བཟོ།";
          return this.labels;

        default:
          return {};
          break;
      }
    },
    onVisionButton() {
      var data = {
        userId: this.patient.id,
        physician:
          this.vision.physician && !isNaN(this.vision.physician)
            ? this.vision.physician
            : null,
        ODsphere:
          this.vision.ODsphere && !isNaN(this.vision.ODsphere)
            ? this.vision.ODsphere
            : null,
        ODcylinder:
          this.vision.ODcylinder && !isNaN(this.vision.ODcylinder)
            ? this.vision.ODcylinder
            : null,
        ODaxis:
          this.vision.ODaxis && !isNaN(this.vision.ODaxis)
            ? this.vision.ODaxis
            : null,
        pd: this.vision.pd && !isNaN(this.vision.pd) ? this.vision.pd : null,
        ODcorrected:
          this.vision.ODcorrected && !isNaN(this.vision.ODcorrected)
            ? this.vision.ODcorrected
            : null,
        add:
          this.vision.add && !isNaN(this.vision.add) ? this.vision.add : null,
        OSsphere:
          this.vision.OSsphere && !isNaN(this.vision.OSsphere)
            ? this.vision.OSsphere
            : null,
        OScylinder:
          this.vision.OScylinder && !isNaN(this.vision.OScylinder)
            ? this.vision.OScylinder
            : null,
        OSaxis:
          this.vision.OSaxis && !isNaN(this.vision.OSaxis)
            ? this.vision.OSaxis
            : null,
        OScorrected:
          this.vision.OScorrected && !isNaN(this.vision.OScorrected)
            ? this.vision.OScorrected
            : null,
      };
      switch (this.action) {
        case "add-vision":
          DataService.create("visions", data)
            .then((response) => {
              this.vision.id = response.data.id;
              this.message = response.data.message;
              console.log(response.data);
              this.submitted = true;
            })
            .catch((e) => {
              this.parseError(e);
            });
          break;
        case "edit-vision":
          console.log(data);
          DataService.update("visions", this.vision.id, data)
            .then((response) => {
              this.message = response.data.message;
              this.submitted = true;
            })
            .catch((e) => {
              this.parseError(e);
            });
          break;
        default:
          console.log("getting in to default action");
          break;
      }
    },

    reeditVision() {
      this.submitted = false;
    },
    // backToPatients() {
    //   this.$events.fire("back-to-patients");
    // },
    getHeaderTitle(action) {
      console.log("getting action:", action);
      switch (action) {
        case "edit-vision":
          return "མཐོང་ནུས་སྒྱུར་བཅོས་བྱེད་པ།";
          break;
        case "add-vision":
          return "མཐོང་ནུས་གསར་པ་ཁ་སྣོན།";
          break;
        case "delete-vision":
          return "མཐོང་ནུས་འདི་གསུབ་བཞིན་ཡོད།";
        case "deleted-vision":
          return "མཐོང་ནུས་དེ་བསུབས་ཚར།";
        default:
          return "མཐོང་ནུས་རེའུ་མིག";
          break;
      }
    },
    parseError(error) {
      let unmetIds = error.response.data.unmetIds;

      if (unmetIds != undefined) {
        // let msg = "";
        // unmetIds.forEach((unmetId) => (msg += this.unmets[unmetId]));
        // msg += "ངེས་པར་དུ་འཇུག་རོགས་གནང་།";
        this.message = "ཆ་འཕྲིན་ཚང་མི་འདུག་པས་ཉར་ཚགས་བྱས་མེད།";
      } else {
        this.message = error.response.data.message;
      }

      console.log(error.response.data);
    },
    validValue,
    getPatient() {
      // console.log("in get patient:", this.patient);
      if (this.action === "edit-vision") {
        this.patient.id = this.vision.userId;
      }
      return this.patient;
    },
  },
};
</script>

<style scoped>
#vision-form {
  max-width: 850px;
  width: fit-content;
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
</style>