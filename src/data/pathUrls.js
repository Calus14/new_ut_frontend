import localSettings from "./localSettings"
export default {

    services: {

      configuration:{
        baseurl: 'http://localhost:'+8070+'/configurationService',
        port: 8085
      },

      comsim:{
        baseurl: 'http://localhost:'+localSettings.localProxyPort+'/comsim',
        port: 8081
      },

      authorization: {
        baseurl: 'todo',
        port: 8070
      },

    },
}
