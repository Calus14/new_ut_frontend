<template>
  <div id="app">
    <img alt="Main Logo" src="./assets/SimulationImage.jpg">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/messages">Messages</router-link> |
      <router-link to="/interfaceDecoders">Interface Decoders</router-link> |
      <router-link to="/transportConfigurations">Transport Configurations</router-link> |
    </div>
    <b-container>
      <router-view/>
    </b-container>

    <div id="login_info" class="input-group center-block">
      <div class="form-group" id="userNameGroup">
        <label for="usernameInput">Username</label>
        <input id="usernameInput" type="text" class="form-control" placeholder="Username" aria-label="Username"
               v-model=" username">
      </div>
      <div class="form-group" id="passwordGroup">
        <label for="passwordInput">Password</label>
        <input id="passwordInput" type="password" class="form-control" placeholder="Password" aria-label="Password"
               v-model="password">
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </div>

    <div id="platform_selector" class="input-group center-block">
      <div class="form-group" id="projectGroup">
        <label for="projectInput">Project</label>
        <input id="projectInput" type="text" class="form-control" placeholder="Project" aria-label="Program"
               v-model="project">
      </div>
      <div class="form-group" id="platformGroup">
        <label for="passwordInput">Platform</label>
        <input id="platformInput" type="text" class="form-control" placeholder="Platform" aria-label="Platform"
               v-model="platform">
      </div>
      <b-button @click="setProgramAndPlatform()" type="submit" variant="primary">Submit</b-button>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      project: "",
      platform: "",
      username: "",
      password: "",
    }
  },

  methods: {
    ...mapActions([
      "setSelectedProject",
      "setSelectedPlatform",
      "setUserName",
      "loginUser",
      "loadTransportConfigurations",
      "loadInterfaceDecoders",
      "loadMessages"
    ]),

    setProgramAndPlatform(){
      this.setSelectedProject(this.project)
      this.setSelectedPlatform(this.platform)
      console.log(this.$store.state.currentlySelectedData)
      if( this.$store.state.currentlySelectedData === "messages"){
        this.loadMessages()
      }
      else if( this.$store.state.currentlySelectedData === "interfacedecoder"){
        this.loadTransportConfigurations()
      }
      else if( this.$store.state.currentlySelectedData === "transportConfigurations"){
        this.loadTransportConfigurations()
      }
    },

    attemptToLogin(){
      this.setUserName(this.username)
      this.loginUser(this.password)
    }
  },
}
</script>

<style lang ="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*.center-block {
  text-align:center;
  width:30%;
  margin: auto;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
    }
}
</style>
