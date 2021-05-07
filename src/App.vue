<template>
  <div id="app">
    <!-- navbar -->
    <div id="navbar" class="w3-bar w3-black">
      <div v-if="authenticated">
        <router-link
          v-if="userType === 'user'"
          to="/patients"
          class="w3-bar-item w3-button"
          >སྤྱོད་མཁན།</router-link
        >

        <div v-else-if="userType === 'staff'">
          <router-link to="/patients" class="w3-bar-item w3-button"
            >སྤྱོད་མཁན།</router-link
          >
          <router-link to="/visions" class="w3-bar-item w3-button"
            >མཐོང་ནུས།</router-link
          >
        </div>
        <router-link v-else to="/static" class="w3-bar-item w3-button"
          >སྤྱོད་མཁན།</router-link
        >
        <router-link
          to="/login"
          @click.native="logout()"
          class="w3-bar-item w3-button w3-right"
          >logout</router-link
        >
      </div>
      <router-link v-else to="/login" class="w3-bar-item w3-button w3-right"
        >ནང་འཇུག</router-link
      >
    </div>
    <div class="container">
      <!-- <keep-alive> -->
      <!-- <transition mode="out-in"> -->
      <router-view @authenticated="setAuthenticated"></router-view>
      <!-- </transition> -->
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: true,
      userType: "staff",
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ path: "/login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
      this.userType = null;
    },
    // getWalkin() {
    //   return {
    //     name: "login",
    //     waitingApproval: true,
    //   };
    // },
  },
};
</script>

<style>
@font-face {
  font-family: "Noto Sans Tibetan";
  src: url("assets/fonts/NotoSansTibetan-Regular.woff2") format("woff2"),
    url("assets/fonts/NotoSansTibetan-Regular.woff") format("woff");
}

#app {
  font-family: "Noto Sans Tibetan", "Avenir", Helvetica, Arial, sans-serif !important;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
}
</style>