<template>
    <div id="baseTransport" >
        <TCPClientTransport v-if="( specificType == 'TCPClientTransportationService')"
                            :transport-as-json="dynamicObjectAsJson"
                            @interfaceDecoderChanged="updateInterfaceDecoder"

        />
        <TCPServerTransport v-if="( specificType == 'TCPServerTransportationService')"
                            :transport-as-json="dynamicObjectAsJson"
        />
    </div>
</template>

<script>
  import TCPClientTransport from "@/components/transports/TCPClientTransport";
  import TCPServerTransport from "@/components/transports/TCPServerTransport";

  export default {
    name: "BaseTransportObject",
    props: {
      rawObject: Object,
    },

    components: {
      TCPClientTransport,
      TCPServerTransport
    },

    methods: {
      updateInterfaceDecoder(interfaceDecoder){
        this.rawObject.interfaceDecoderId = interfaceDecoder.interfaceDecoderConfigurationId
        console.log("Updated the decoderID on the object")
      },
    },

    computed: {
      specificType: function(){
        if( this.rawObject && this.rawObject.transportAsJson ) {

          return JSON.parse(this.rawObject.transportAsJson).myClassName.split('.').pop()
        }
        return ""
      },
      dynamicObjectAsJson: function(){
        if(this.rawObject && this.rawObject.transportAsJson)
            return JSON.parse(this.rawObject.transportAsJson)
        return {}
      }

    }

  }
</script>
