// MyVuetable.vue

<template>
  <div class="ui-region">
    <div v-if="appendParams.userId === undefined" id="toolbar">
      <filter-bar></filter-bar>
      <add-button v-if="showAdd"></add-button>
    </div>
    <patient-info
      v-else
      :patient="patient"
      header-title="མཐོང་ནུས་ཀྱི་མིང་ཐོ།"
    ></patient-info>
    <vuetable
      :ref="vuetableRef"
      :api-url="apiUrl"
      :per-page="3"
      :fields="fields"
      pagination-path=""
      :append-params="appendParams"
      :query-params="queryParams"
      :detail-row-component="detailRowComponent"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:cell-clicked="onCellClicked"
      :key="refreshKey"
      :css="css.table"
    >
      <template slot="actions" slot-scope="props">
        <custom-actions
          :rowData="props.rowData"
          :rowIndex="props.rowIndex"
          :vuetable-ref="vuetableRef"
          :patient="patient"
        ></custom-actions>
      </template>
    </vuetable>
    <div class="w3-cell-row w3-padding">
      <vuetable-pagination-info
        ref="paginationInfo"
        :css="css.paginationInfo"
        info-template="སྡོམ་པས་{total}་ལས་{from}་ནས་{to}་བར་སྟོན་བཞིན་ཡོད།"
        no-data-template="འབྲེལ་ཡོད་ཀྱི་ཆ་འཕྲིན་མེད།"
      ></vuetable-pagination-info>
      <vuetable-pagination
        ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
        :css="css.pagination"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import accounting from "accounting";
import moment from "moment";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import Vue from "vue";
import CustomActions from "./CustomActions";

import VuetableW3css from "./vuetableW3css";
// adding a filter bar
import FilterBar from "./FilterBar";
Vue.component("filter-bar", FilterBar);
// adding add button
import addButton from "./addButton";
Vue.component("add-button", addButton);
// adding back button
import PatientInfo from "./patientInfo";
Vue.component("patient-info", PatientInfo);

import VueEvents from "vue-events";

Vue.use(VueEvents);

// import FieldsData from "./FieldsData.js";

export default {
  name: "my-vuetable",
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    CustomActions,
    // VuetableRowHeader,
    // PatientInfo,
  },
  data() {
    return {
      css: VuetableW3css,
      buttonComponent: this.vuetableRef,
      refreshKey: 0,
    };
  },

  props: {
    showAdd: {
      type: Boolean,
      default() {
        return false;
      },
    },
    patient: {
      type: Object,
      default() {
        return {};
      },
    },

    vuetableRef: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    sortOrder: {
      default() {
        return [];
      },
    },
    appendParams: {
      type: Object,
      default() {
        return {};
      },
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      },
    },
    detailRowComponent: {
      type: String,
    },
  },

  mounted() {
    this.$events.$on("filter-set", (eventData) => this.onFilterSet(eventData));
    this.$events.$on("filter-reset", (e) => this.onFilterReset());
    this.$events.$on("refresh-key", (eventData) => {
      this.forceRerender();
    });
  },

  methods: {
    forceRerender() {
      this.refreshKey += 1;
    },
    allcap(value) {
      return value.toUpperCase();
    },
    genderLabel(value) {
      return value === "M"
        ? '<span class="w3-tag w3-round turquoise padding-top-6"><i class="fa fa-mars"></i> ཕོ།</span>'
        : '<span class="w3-tag w3-round coral padding-top-6"><i class="fa fa-venus"></i> མོ།</span>';
    },
    formatNumber(value) {
      return accounting.formatNumber(value, 2);
    },
    formatDate(value, fmt = "D MMM YYYY") {
      return value == null ? "" : moment(value, "YYYY-MM-DD").format(fmt);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs[this.vuetableRef].changePage(page);
    },
    onCellClicked(data, field, event) {
      this.$refs[this.vuetableRef].toggleDetailRow(data.id);
    },
    onFilterSet(filterText) {
      if (filterText) {
        this.appendParams.name = filterText;
        this.forceRerender();
      }
    },
    onFilterReset() {
      if (this.appendParams.name) {
        this.appendParams.name = null;
        this.forceRerender();
      }
    },
  },
};
</script>
<style>
#tool-bar {
  width: 100%;
  /* text-align: cener; */
  /* color: #2c3e50; */
}
.padding-top-6 {
  padding-top: 6px;
}
.table-top-border {
  border-top: 1px solid blue;
}
.w3-table-all tr th,
.vuetable-body tr td {
  text-align: center;
  vertical-align: middle;
  border-left: 1px solid lightgray;
}

.disabled-item {
  cursor: not-allowed;
  pointer-events: none;

  /*Button disabled - CSS color class*/
  color: #c0c0c0;
  background-color: #ffffff;
}

.ui-region {
  display: block;
  max-width: 100%;
}

@media only screen and (min-width: 1200px) {
  .ui-region {
    width: 1127px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media only screen and (max-width: 1199px) and (min-width: 992px) {
  .ui-region {
    width: 933px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (max-width: 991px) and (min-width: 768px) {
  .ui-region {
    width: 723px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (max-width: 767px) {
  .ui-region {
    width: auto;
    margin-left: 16px;
    margin-right: 16px;
  }

  table thead {
    display: none;
  }
  .w3-table-all td {
    display: flex;
  }
  .vuetable-body tr td {
    text-align: left;
  }

  .w3-table-all td::before {
    content: attr(label);
    font-weight: bold;
    width: 120px;
    min-width: 120px;
  }
}
.turquoise {
  background-color: #30c0e0;
  color: #000;
}
.coral {
  background-color: #e22121;
  color: #fff;
}
.emerald {
  background-color: #50c878;
  color: #fff;
}
.onyx {
  background-color: #353839;
  color: #fff;
}
</style>