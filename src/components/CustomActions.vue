   // CustomActions.vue

  <template
  >
  <div class="custom-actions">
    <button
      v-if="vuetableRef === 'patientTableRef'"
      class="w3-button w3-amber w3-tiny w3-round"
      @click="itemAction('add-vision', rowData, rowIndex)"
    >
      <i class="fa fa-plus w3-medium"></i>
    </button>
    <button
      v-if="vuetableRef === 'patientTableRef'"
      class="w3-button w3-amber w3-tiny w3-round"
      @click="itemAction('view-visions', rowData, rowIndex)"
    >
      <i class="fa fa-eye w3-medium"></i>
    </button>
    <button
      class="w3-button w3-tiny w3-round"
      v-bind:class="colorButton(vuetableRef)"
      @click="itemAction('edit', rowData, rowIndex)"
    >
      <i class="fa fa-edit w3-medium"></i>
    </button>
    <button
      class="w3-button w3-tiny w3-round"
      v-bind:class="colorButton(vuetableRef)"
      @click="openModal"
    >
      <i class="fa fa-minus"></i>
    </button>
    <div v-if="showModal">
      <div class="w3-modal" v-bind:class="{ 'show-modal-block': showModal }">
        <div class="w3-modal-content w3-card-4 w3-animate-top my-modal-size">
          <patient-info
            v-if="vuetableRef === 'patientTableRef'"
            :patient="rowData"
            :action="getAction(vuetableRef)"
            :header-title="headerTitle"
          >
            <!-- feediing into the slot. -->
            <template v-if="submitted" v-slot:patientData>
              <div class="w3-container w3-padding">{{ message }}</div>
            </template>
          </patient-info>
          <vision-actions
            v-else
            :action="getAction(vuetableRef)"
            :vision="rowData"
            :patient="patient"
          >
            <template v-if="submitted" v-slot:visionData>
              <div class="w3-container w3-padding">{{ message }}</div>
            </template>
          </vision-actions>

          <footer class="w3-container w3-padding w3-margin-top">
            <button
              v-if="submitted"
              class="w3-button"
              v-bind:class="colorButton(vuetableRef)"
              @click="dismissModal"
            >
              ཁ་རྒྱག
            </button>
            <div v-else>
              <button
                class="w3-button"
                v-bind:class="colorButton(vuetableRef)"
                @click="dismissModal"
              >
                ཕྱིར་འཐེན།
              </button>
              <button
                class="w3-button"
                v-bind:class="colorButton(vuetableRef)"
                @click="itemAction('delete', rowData, rowIndex)"
              >
                བསུབ།
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import Vue from "vue";
import PatientInfo from "./patientInfo";
import VisionActions from "./visionActions.vue";
import DataService from "../http/services/dataService";
// import VisionActions from "./visionActions";
export default {
  name: "custom-actions",
  components: {
    PatientInfo,
    VisionActions,
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
    },
    vuetableRef: {
      type: String,
      required: true,
    },
    patient: {
      type: Object,
      default() {
        return {};
      },
    },
    vision: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      submitted: false,
      message: "",
      showModal: false,
      headerTitle: "ནད་པ་འདི་གསུབ་དགོས་སམ།",
    };
  },

  methods: {
    getAction(componentRef) {
      switch (componentRef) {
        case "patientTableRef":
          if (this.submitted) {
            return "deleted-patient";
          } else {
            return "delete-patient";
          }
          break;
        case "visionVuetable":
          if (this.submitted) {
            return "deleted-vision";
          } else {
            return "delete-vision";
          }

        default:
          return "";
          break;
      }
    },
    colorButton(componentRef) {
      switch (componentRef) {
        case "patientTableRef":
          return { onyx: true };
          break;

        default:
          return { "w3-amber": true };
          break;
      }
    },

    openModal() {
      this.showModal = true;
    },

    dismissModal() {
      this.showModal = false;
    },

    deleteAction(serviceName, id) {
      DataService.delete(serviceName, id)
        .then((response) => {
          this.message = response.data.message;
          this.headerTitle = "བསུབས་ཚར་སོང་།";
          this.submitted = true;
          this.$events.fire("refresh-key", {
            id: id,
            "service-name": serviceName,
          });
          // }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    itemAction(action, data, index) {
      switch (action) {
        case "add-vision":
          this.$events.fire("add-vision", data);
          break;
        case "view-visions":
          this.$events.fire("view-visions", data);
          break;
        case "edit":
          if (this.vuetableRef === "patientTableRef") {
            this.$events.fire("edit-patient", data);
          } else {
            this.$events.fire("edit-vision", data);
          }

          break;
        case "delete":
          if (this.vuetableRef === "patientTableRef") {
            console.log("you are about to delete patient:", data.id);
            this.deleteAction("patients", data.id);
          } else {
            console.log("you are about to delete  vision", data.id);
            this.deleteAction("visions", data.id);
          }
          break;

        // this.showModal = false;
      }
    },
  },
};
</script>

  <style>
.show-modal-block {
  display: block;
}
.my-modal-size {
  max-width: 850px;
  width: fit-content;
  margin: auto;
}
.custom-actions button.ui.button {
  padding: 8px 8px;
}
.custom-actions button.ui.button > i.icon {
  margin: auto !important;
}
</style>