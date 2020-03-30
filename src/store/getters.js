export default {
  getAllMessages: (state) => {
    return state.messages
  },

  //TODO
  getMessagesWithSearchString: (state, searchString) =>{
    console.log(searchString)
    return state.messages
  },

  getAllInterfaceDecoders: (state) => {
    return state.interfaceDecoders
  },

  getAllTransportConfigurations: (state) => {
    return state.transportConfigurations
  },

  getCurrentlySelectedData: (state) => {
    return state.currentlySelectedData
  },

  getSelectedConfigurationItem: (state) => {
    return state.selectedConfigurationItem
  }

}
