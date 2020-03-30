import pathUrls from "../data/pathUrls"

export default {

  setUserName: ({ commit }, userName) => {
    commit('setUsername', userName)
  },

  setSelectedProject: ({ commit }, project) => {
    commit('setSelectedProject', project)
  },

  setSelectedPlatform: ({ commit }, platform) => {
    commit('setSelectedPlatform', platform)
  },

  setCurrentlySelectedData: ({commit}, dataType) => {
    commit("setCurrentlySelectedData", dataType)
  },


  loginUser: ({ commit, state}, password) => {
    /*
    TODO do the actual JWT authorization with the states user name
     */
    var loginRequest = new URL(pathUrls.services.authorization.baseurl)
    var loginParams = {userName: state.userName, password: password}

    loginRequest.search = new URLSearchParams(loginParams).toString()

    fetch(loginRequest,
        {mode: 'no-cors',
          method: 'GET'
        })
        .then( response => {
          response.json().then( json => {
            commit("setAuthJwt", json.authJwt)
          })
        })
  },

  loadMessages: ({ commit, state }) => {

    var loginRequest = new URL(pathUrls.services.configuration.baseurl+'/configurationMessages')
    var loginParams = {project: state.selectedProject, platform: state.selectedPlatform}
    console.log(loginParams)

    loginRequest.search = new URLSearchParams(loginParams).toString()

    fetch(loginRequest,
        {mode: 'no-cors',
          method: 'GET'
        })
        .then( response => {
          return response.json()
        }).then( json => {
            console.log(json)
            commit("setMessages", json)
        })
  },

    loadInterfaceDecoders: ({ commit, state }) => {

    var loginRequest = new URL(pathUrls.services.configuration.baseurl+'/interfaceDecoders')
      var loginParams = {project: state.selectedProject, platform: state.selectedPlatform}

    loginRequest.search = new URLSearchParams(loginParams).toString()

    fetch(loginRequest,
        {mode: 'no-cors',
          method: 'GET'
        })
        .then( response => {
          response.json().then( json => {
            commit("setInterfaceDecoders", json.messages)
          })
        })
  },

  loadTransportConfigurations: ({ commit, state }) => {

    var loginRequest = new URL(pathUrls.services.configuration.baseurl+'/transportConfigurations')
    var loginParams = {project: state.selectedProject, platform: state.selectedPlatform}

    loginRequest.search = new URLSearchParams(loginParams).toString()

    fetch(loginRequest,
        {mode: 'no-cors',
          method: 'GET'
        })
        .then( response => {
          response.json().then( json => {
            commit("setMessages", json.messages)
          })
        })
  },

  //TODO add in some random even to be thrown so we can update other parts of the site
  setSelectedConfigurationItem: ({commit}, configurationItem) => {
    commit("setSelectedConfigurationItem", (configurationItem))
  }

}

