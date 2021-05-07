export default [
  // {
  //   name: "__checkbox",
  //   titleClass: "center aligned",
  //   dataClass: "center aligned",
  // },
  {
    name: "id",
    visible: false,
  },
  {
    name: "name",
    title: "མིང་།",
    titleClass: "w3-center",
    dataClass: "td-middle",
  },
  {
    name: "contact",
    title: "འབྲེལ་ལམ།",
    titleClass: "w3-center",
    dataClass: "td-middle",
  },
  {
    name: "birthDate",
    title: "སྐྱེས་སྐར།",
    titleClass: "w3-center",
    dataClass: "td-middle",
    // callback: "YYYY-MM-DD",
  },

  {
    name: "gender",
    title: "ཕོ་མོ།",
    titleClass: "w3-center",
    dataClass: "td-middle",
    callback: "genderLabel",
  },
  {
    name: "resideCounty",
    title: "རྫོང་།",
    titleClass: "w3-center",
    dataClass: "td-middle",
    // callback: "formatNumber",
  },
  {
    name: "school",
    title: "སློབ་གྲྭ",
    titleClass: "w3-center",
    dataClass: "td-middle",
    visible: false,
    // callback: "formatNumber",
  },
  {
    name: "__slot:actions", // <----
    title: "བྱ་འགུལ།",
    titleClass: "w3-center",
    dataClass: "td-middle",
  },
]