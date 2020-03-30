export default {

  setUserName: (state, username) => {
    state.username= username
  },

  setAuthJwt: (state, newJwt) => {
    state.authJwt= newJwt
  },

  setSelectedPlatform: (state, platform) => {
    state.selectedPlatform= platform
  },

  setSelectedProject: (state, project) => {
    state.selectedProject= project
  },

  setProgramProjectMap: (state, programProjectMap) => {
    state.programProjectMap= programProjectMap
  },

  setMessages: (state, messages) => {
    state.messages= messages
  },

  setInterfaceDecoders: (state, interfaceDecoders) => {
    state.messages= interfaceDecoders
  },

  setTransportConfigurations: (state, transportConfigurations) => {
    state.messages= transportConfigurations
  },

  setCurrentlySelectedData: (state, currentlySelectedData) => {
    state.currentlySelectedData = currentlySelectedData
  },

  setSelectedConfigurationItem: (state, selectedConfigurationItem) => {
    state.selectedConfigurationItem = selectedConfigurationItem
  }

}
