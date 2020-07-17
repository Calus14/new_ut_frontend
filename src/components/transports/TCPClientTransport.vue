<template>
    <div id="tcpClientTransport" >
        <div id="aboutModal" style="float: left; padding: 8px">
            <b-button v-b-modal.modal-about-client variant="info"> About TCP Clients </b-button>

            <b-modal ok-only
                    id="modal-about-client"
                    ref="about-modal"
                    title="About Static ID Decoders"
            >
               <span>{{description}}</span>
            </b-modal>
        </div>

        <div id="mainInput" class="input-group">
            <div class="form-group" id="selfInfoGroup" style="width : 90%; text-align: left;">
                <label class="float-label" for="selfPortInput">Port To Bind To:    </label>
                <input id="selfPortInput" type="number" class="" placeholder="8000" aria-label="selfPortInput"
                       v-model="transportAsJson.receivePort"
                       @keyup="changeData">
            </div>

            <div class="form-group" id="serverGroup" style="width : 90%; text-align: left;">
                <label class="float-label" for="serverPortInput">Server Port:    </label>
                <input id="serverPortInput" type="number" class="" placeholder="8001" aria-label="serverPortInput"
                       v-model="transportAsJson.sendPort"
                       @keyup="changeData">
                <label class="float-label" for="serverAddressInput">Server Address:    </label>
                <input id="serverAddressInput" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" class="" placeholder="192.168.0.1" aria-label="addressInput"
                       v-model="transportAsJson.sendHostAddress"
                       @keyup="changeData">
            </div>
        </div>
        <div id="decoderSelector" class="input-group">
            <div class="form-group dropdown">
                <b-dropdown class="m-md-1" id="decoderDropdown" :text="decoderName" style="float: left">
                    <b-dropdown-item v-for="item in wrapperTest" :key="item.id" @click="setInterfaceDecoder(item)">{{item.configurationName}}</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "TCPClientTransport",
    props: {
      transportAsJson: Object,
    },

    data(){
      return {
        description: "A TCP Client Transport Configuration creates a TCP Client Socket on the machine it is launched too. The configuration must specify what port it wishes to bind too"+
                    " and the ip address of the server it will attempt to connect to. It may also specify the specific port the server will be bound too if multiple servers will be running.",
      }
    },

    computed: {
        decoderName: function(){
            if( this.transportAsJson && this.transportAsJson.decoder){
              return this.transportAsJson.decoder.decoderName
            }
            return ""
        },

        wrapperTest: function(){
          var decoders = this.$store.getters.getAllInterfaceDecoders
          console.log(decoders)
          this.$store.getters.getAllInterfaceDecoders.forEach(decoder =>{
            console.log(decoder)
          })
          return decoders
        }
    },

    methods: {
      ...mapActions([
        "getAllInterfaceDecoders"
      ]),

      changeData(){
        this.$emit('validateData', this)
        this.$emit('dataChanged', this)
      },

      setInterfaceDecoder(interfaceDecoder){
        console.log(interfaceDecoder)
        this.$emit('interfaceDecoderChanged', interfaceDecoder)
        this.transportAsJson.decoder = JSON.parse(interfaceDecoder.interfaceDecoderAsJson)
      },

    },
  }
</script>

<style scoped>

    @import '../../styles/mainStyles.scss';

    .input-group{
        margin: 8px;
        padding: 5px;
        border-color: #0f1021;
        border-style: inset;
        border-radius: 8px;
    }


</style>
