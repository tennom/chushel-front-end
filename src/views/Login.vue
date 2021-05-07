<template>
  <div class="hello">
    <img src="@/assets/logo.png" />
    <h1>{{ msg }}</h1>
    <label>པར་གཞི། 1.1</label>
    <div v-if="walkIn">
      <div class="w3-container">
        ཆུ་ཤེལ་ལས་མི་ཞིག་གིས་ཁྱེད་ཀྱི་ཐོ་ཁོངས་ངོས་འཛིན་བྱེད་དགོས་པས།
        སྒུག་རོགས་གནང་།
      </div>
    </div>
    <div v-else id="login">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        v-model="input.username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "ཆུ་ཤེལ་གྲངས་མཛོད་བེད་སྤྱོད་གནང་བར་དགའ་བསུ་ཞུ།",
      input: {
        username: "",
        password: "",
      },
    };
  },
  props: {
    walkIn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "secure" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin-top: 60px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  text-align: center;
}
</style>
