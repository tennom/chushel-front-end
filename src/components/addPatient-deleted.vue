<template>
  <div id="patient-form" class="w3-container">
    <div class="w3-card-4 w3-margin">
      <div class="w3-cell-row w3-padding w3-blue-grey">
        <back-arrow :base-component="baseComponent"></back-arrow>

        <div class="w3-cell w3-cell-middle">
          <h3>ནད་པའི་རེའུ་མིག</h3>
        </div>
      </div>
      <div v-if="!submitted">
        <form class="w3-container w3-padding">
          <label class="w3-text-brown">མིང་།</label>
          <input
            type="text"
            class="w3-input w3-border"
            id="name"
            required
            v-model="patient.name"
            name="name"
          />
          <label class="w3-text-brown">འབྲེལ་ལམ།</label>
          <input
            type="text"
            class="w3-input w3-border"
            id="contact"
            required
            v-model="patient.contact"
            name="contact"
          />
          <div class="w3-container w3-padding w3-text-brown">
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

          <div class="w3-container w3-padding w3-text-brown">
            <label for="birthday">སྐྱེ་སྐར།</label>
            <VueDatePicker
              v-model="patient.birthDate"
              format="YYYY-MM-DD"
              noHeader
              placeholder="2000-01-01"
              color="#795548"
              :locale="locale"
            />
          </div>

          <div class="w3-container w3-padding w3-text-brown">
            <label>རྫོང་།</label>
            <select
              class="w3-select"
              name="county"
              required
              v-model="patient.county"
            >
              <option value="1">ལྷ་ས།</option>
              <option value="2">ཆུ་ཤུར།</option>
              <option value="3">མལ་གྲོ</option>
            </select>
          </div>
          <button
            type="button"
            @click="savePatient"
            class="w3-btn w3-blue-grey"
          >
            ཁ་སྣོན།
          </button>
        </form>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="w3-button w3-blue-grey" @click="newPatient">Add</button>
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
    ordinal: (n) => `${n}º`,
    buttonCancel: "ཕྱིར་འཐེན།",
    buttonValidate: "Ok",
    rangeHeaderText: "Dalle %d Alle 13",
  },
};

export default {
  name: "add-patient",
  components: {
    backArrow,
  },

  data() {
    return {
      patient: {
        id: null,
        name: "",
        contact: "",
        gender: "",
        birthDate: "2000-01-01",
        county: "",
      },
      submitted: false,
      locale,
      baseComponent: "patients",
    };
  },
  methods: {
    savePatient() {
      var data = {
        name: this.patient.name,
        contact: this.patient.contact,
        birthDate: this.patient.birthDate,
        gender: this.patient.gender,
        resideCounty: this.patient.county,
      };
      // console.log(data);
      // this.submitted = true;

      DataService.create("patients", data)
        .then((response) => {
          this.patient.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPatient() {
      this.submitted = false;
      this.patient = {
        // name: "awesome",
        // contact: "fsdlkjfd",
        // gender: "F",
        // county: "2",
        // birthDate: "2020-12-18",
      };
    },
  },
};
</script>

<style>
#patient-form {
  max-width: 600px;
  margin: auto;
}
</style>