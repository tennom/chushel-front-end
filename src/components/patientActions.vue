<template>
  <div id="patient-form" class="w3-container">
    <div class="w3-card-4 w3-margin">
      <div class="w3-cell-row w3-padding onyx">
        <back-arrow base-component="patients"></back-arrow>

        <div class="w3-cell w3-cell-middle">
          <h3>{{ patientActionTitle }}</h3>
        </div>
      </div>
      <div v-if="!submitted">
        <form class="w3-container w3-padding">
          <div class="slight-margin">
            <label class="w3-text-brown">མིང་།</label>
            <input
              type="text"
              class="w3-input w3-border line-height-bo"
              id="name"
              required
              v-model="patient.name"
              name="name"
            />
          </div>
          <div class="slight-margin">
            <label class="w3-text-brown">ཁ་པར།</label>
            <input
              type="text"
              class="w3-input w3-border"
              id="contact"
              v-model="patient.contact"
              name="contact"
            />
          </div>

          <div class="w3-container slight-margin w3-padding w3-text-brown">
            <input
              type="radio"
              class="w3-radio"
              name="gender"
              value="M"
              v-model="patient.gender"
            />
            <label>ཕོ།</label>
            <input
              class="w3-radio"
              type="radio"
              name="gender"
              value="F"
              v-model="patient.gender"
            />
            <label>མོ།</label>
          </div>

          <div class="w3-container slight-margin w3-padding w3-text-brown">
            <label for="birthday">སྐྱེ་སྐར།</label>
            <!-- :locale="locale":language="bo" -->
            <VueDatePicker
              v-model="patient.birthDate"
              ref="menu"
              format="YYYY-MM-DD"
              noHeader
              color="#795548"
              :locale="locale"
              min-date="1930-01-01"
              :max-date="new Date().toISOString().substr(0, 10)"
              @onOpen="menu = true"
              @onClose="menu = false"
              placeholder="ཚེས་གྲངས་ཤིག་འདོམས།"
            />
          </div>

          <div class="w3-container slight-margin w3-text-brown">
            <label class="">རྫོང་།</label>
            <!-- <div class="w3-container">
              <div class="w3-cell w3-mobile">county:</div> -->
            <div class="w3-cell w3-mobile">
              <div class="horiz-margin">
                <select
                  class="w3-select overide_pads"
                  name="state"
                  required
                  v-model="selectedState"
                >
                  <option value="" selected>ས་ཁུལ་གདམ་རོགས།</option>
                  <option v-for="(state_obj, state) in places" :value="state">
                    {{ state }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w3-cell w3-mobile">
              <div class="horiz-margin">
                <select
                  class="w3-select overide_pads"
                  name="county"
                  :disabled="counties.length == 0"
                  v-model="selectedCounty"
                >
                  <option value="">རྫོང་བདམས་མེད།</option>
                  <option v-for="county in counties" :value="county">
                    {{ county }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="w3-container slight-margin w3-text-brown">
            <label
              >སློབ་མ་ཡིན་ན་སློབ་གྲྭ་འཇུག་རོགས།:
              <input
                list="schools"
                name="school"
                type="text"
                v-model="patient.school"
            /></label>
            <datalist id="schools">
              <option value="Chrome"></option>
              <option value="Firefox"></option>
              <option value="Internet Explorer"></option>
              <option value="Opera"></option>
              <option value="Safari"></option>
              <option value="Microsoft Edge"></option>
            </datalist>
          </div>
          <button type="button" @click="onPatientAction" class="w3-btn onyx">
            {{ actionButtonLabel }}
          </button>
          <div class="w3-container w3-padding">{{ message }}</div>
        </form>
      </div>

      <div v-else>
        <!-- <h4>{{ message }}</h4> -->
        <div class="w3-container w3-padding">{{ message }}</div>
        <button
          v-if="action === 'edit-patient'"
          class="w3-button onyx"
          @click="onActAgain"
        >
          {{ actAgainLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../http/services/dataService";
import Vue from "vue";
import VueDatePicker from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
Vue.use(VueDatePicker);
import backArrow from "./backNav";
const locale = {
  lang: {
    name: "bo",
    weekdays: "ཉི་མ།_ཟླ་བ།_མིག་དམར།_ལྷག་པ།_ཕུར་བུ།_པ་སངས།_སྤེན་པ།".split("_"),
    weekdaysShort: "ཉི།_ཟླ།_མིག_ལྷག_ཕུར།_སངས།_སྤེན།".split("_"),
    weekdaysMin: "ཉི_ཟླ_མིག_ལྷག_ཕུར_སངས_སྤེན".split("_"),
    weekStart: 1,
    months: "ཟླ་དང་པོ།_ཟླ་གཉིས་པ།_ཟླ་གསུམ་པ།_ཟླ་བཞི་བ།_ཟླ་ལྔ་བ།_ཟླ་དྲུག་པ།_ཟླ་བདུན་པ།_ཟླ་བརྒྱད་པ།_ཟླ་དགུ་བ།_ཟླ་བཅུ་བ།_ཟླ་བཅུ་གཅིག་པ།_ཟླ་བཅུ་གཉིས་པ།".split(
      "_"
    ),
    monthsShort: "དང་པོ།_གཉིས་པ།_གསུམ་པ།_བཞི་བ།_ལྔ་བ།_དྲུག་པ།_བདུན་པ།_བརྒྱད་པ།_དགུ་བ།_བཅུ་བ།_བཅུ་གཅིག_བཅུ་གཉིས།".split(
      "_"
    ),
    formats: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY/MM/DD",
      LL: "YYYY MMMM D",
      LLL: "YYYY MMMM D HH:mm",
      LLLL: "YYYY MMMM D dddd HH:mm",
    },
    ordinal: (n) => n,
    buttonCancel: "ཕྱིར་འཐེན།",
    buttonValidate: "Ok",
    rangeHeaderText: "%d་ནས་%d་བར།",
  },
};

export default {
  name: "patient-actions",
  components: {
    backArrow,
  },
  props: {
    places: {
      type: Object,
      default() {
        return {
          "ལྷ་ས།": [
            "ལྷ་ས་གྲོང་ཁྱེར།",
            "སྟོད་ལུང་།",
            "འདམ་གཞུང་།",
            "སྙེ་མོ།",
            "ཆུ་ཤུར།",
            "ལྷུན་གྲུབ།",
            "སྟག་རྩེ།",
            "མལ་གྲོ་གོང་དཀར།",
          ],
          "ལྷོ་ཁ།": ["རྩེད་ཐང་།"],
          "ནག་ཆུ།": ["ནག་ཆུ།", "Kyoto", "Nagoya", "Hiroshima"],
          "གཞིས་ཀ་རྩེ།": ["བསམ་འགྲུབ་རྩེ།"],
          "མངའ་རིས།": [
            "སེང་གེ་གཙང་པོ།",
            "Johor Bahru",
            "George Town",
            "Kota Kinabalu",
          ],
          "ཆབ་མདོ།": ["ཆབ་མདོ།", "Johor Bahru", "George Town", "Kota Kinabalu"],
          "ཀོང་པོ།": [
            "བྲག་ཡིབ།",
            "Johor Bahru",
            "George Town",
            "Kota Kinabalu",
          ],
        };
      },
    },
    patient: {
      type: Object,
      default() {
        return {
          id: null,
          name: "",
          contact: "",
          gender: "",
          birthDate: null,
          selectedState: "",
          selectedCounty: "",
          school: "",
        };
      },
    },
    action: {
      type: String,
      required: true,
    },

    patientActionTitle: {
      type: String,
      default() {
        switch (this.action) {
          case "edit-patient":
            return "ནད་པའི་སྐོར་སྒྱུར་བཅོས།";
            break;
          case "add-patient":
            return "ནད་པ་གསར་པ་ཁ་སྣོན།";
            break;
          default:
            return "";
            break;
        }
      },
    },
  },

  data() {
    return {
      actionButtonLabel: "",
      submitted: false,
      message: "",
      locale,
      menu: false,
      unmets: { 0: "མིང་།", 1: " ཁ་པར།", 2: " ཕོ་མོ། " },

      selectedState: this.patient.selectedState,
      selectedCounty: this.patient.selectedCounty,
      counties:
        this.patient.selectedState.length > 0
          ? this.places[this.patient.selectedState]
          : [],
    };
  },
  mounted() {
    switch (this.action) {
      case "add-patient":
        this.actionButtonLabel = "ཁ་སྣོན།";
        break;
      case "edit-patient":
        this.actionButtonLabel = "བསྒྱུར་བཅོས།";
        break;
      default:
        break;
    }
  },
  computed: {
    getPatientData: function () {
      return {
        name: this.patient.name,
        contact: this.patient.contact,
        birthDate: this.patient.birthDate,
        gender: this.patient.gender,
        resideCounty: this.selectedState + "|" + this.selectedCounty,
        school: this.patient.school,
      };
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.menu.$refs.agenda.mode = "year"));
    },
    selectedState: function () {
      // Clear previously selected values
      this.counties = [];
      this.selectedCounty = "";
      // Populate list of countries in the second dropdown
      if (this.selectedState.length > 0) {
        this.counties = this.places[this.selectedState];
      }
    },
  },
  methods: {
    // validatePatient() {
    //   if (this.patient.name.length < 3){

    //   }
    // },
    onPatientAction() {
      // validation
      // console.log("getting throu");

      switch (this.action) {
        case "add-patient":
          this.savePatient();
          break;

        case "edit-patient":
          this.editPatient();
          break;
      }
    },

    editPatient() {
      var data = this.getPatientData;
      data.id = this.patient.id;
      // todo: add validation
      DataService.update("patients", data.id, data)
        .then((response) => {
          this.patient.id = response.data.id;
          console.log(response.data);
          this.message = response.data.message;
          this.actAgainLabel = "Reedit";
          this.submitted = true;
        })
        .catch((e) => {
          this.parseError(e);
        });
    },

    savePatient() {
      // var data = {
      //   name: this.patient.name,
      //   contact: this.patient.contact,
      //   birthDate: this.patient.birthDate,
      //   gender: this.patient.gender,
      //   resideCounty: this.patient.county,
      // };
      var data = this.getPatientData;
      // console.log(data);
      // this.submitted = true;

      DataService.create("patients", data)
        .then((response) => {
          this.patient.id = response.data.id;
          console.log(response.data);
          this.message = response.data.message;
          // this.patientMsg = "The patient is saved successfully!";
          // this.actAgainLabel = "Add more";
          // console.log(this.message);
          this.submitted = true;
        })
        .catch((error) => {
          this.parseError(error);
        });
    },
    parseError(error) {
      let unmetIds = error.response.data.unmetIds;

      if (unmetIds != undefined) {
        let msg = "";
        unmetIds.forEach((unmetId) => (msg += this.unmets[unmetId]));
        msg += "ངེས་པར་དུ་འཇུག་རོགས་གནང་།";
        this.message = msg;
      } else {
        this.message = error.response.data.message;
      }

      console.log(error.response.data);
    },
    onActAgain() {
      this.submitted = false;
      this.actAgainLabel = "བསྐྱར་བཟོ།";
    },
  },
};
</script>

<style>
#patient-form {
  max-width: 600px;
  margin: auto;
}
.line-height-bo {
  line-height: normal;
}
.slight-margin {
  margin: 6px 0px;
}
.horiz-margin {
  margin: 0px 6px;
}
.overide_pads {
  padding: 2px 0px;
}
</style>