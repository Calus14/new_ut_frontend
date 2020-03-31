
export default {

    username: "",
    authJwt: null,

    // Current view state
    selectedProject: "",
    selectedPlatform: "",

    // Possible programs and projects
    programProjectMap: { },

    // all possible interactable data to view and edit
    messages: [],
    interfaceDecoders: [],
    transportConfigurations: [],

    currentlySelectedData: "",

    selectedConfigurationItem: {
        projectName: "",
        platformName: "",
        messageAsJson: "",
        configurationName: "",
        createdBy: ""
    }
}
