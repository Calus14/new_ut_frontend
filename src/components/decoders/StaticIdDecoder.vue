<template>
    <div id="staticIdDecoder" >
        <div id="aboutModal" style="float: left; padding: 8px">
            <b-button v-b-modal.modal-about-decoder variant="info"> About Static ID Decoders </b-button>

            <b-modal ok-only
                    id="modal-about-decoder"
                    ref="about-modal"
                    title="About Static ID Decoders"
            >
               <span>{{description}}</span>
            </b-modal>
        </div>
        <div id="mainInput" class=" input-group">
            <div class="form-group" id="nameGroup">
                <label class="float-label" for="nameInput">Decoder Name:    </label>
                <input id="nameInput" type="text" class="" placeholder="Decoder Name" aria-label="nameInput"
                       v-model="decoderAsJson.decoderName"
                       @keyup="changeDecoderData">
            </div>
            <div id="staticIdInfoInput" class="input-group" >
                <label style="float: right; padding-right: 50px; padding-top: 8px;">Static ID Info</label>
                <b-button v-b-modal.modal-about-staticIDs variant="info"> About Static IDs </b-button>

                <b-modal ok-only
                         id="modal-about-staticIDs"
                         ref="about-modal"
                         title="About Static IDs"
                >
                    <span>{{staticIDsDescription}}</span>
                </b-modal>

                <b-button style="float: right" v-b-modal.modal-add-staticID variant="success"> Add Static ID </b-button>

                <b-modal
                         id="modal-add-staticID"
                         ref="about-modal"
                         title="Add Static ID"
                         @show="resetAddModal"
                         @hidden="resetAddModal"
                         @ok="handleOk"
                >
                    <form ref="addItemForm" @submit.stop.prevent="handleSubmit">
                        <b-form-group :state="newBitLengthState"
                                      label="Bit Length"
                                      label-for="bit-length-input"
                                      invalid-feedback="The Bit Length can not overlap with any other ID Info"
                        >
                            <b-form-input id="bit-length-input" type="number" min="1"
                                          v-model="newBitLength"
                                          :state="newBitLengthState"
                                          required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group :state="newBitOffsetState"
                                      label="Bit Offset"
                                      label-for="bit-offset-input"
                                      invalid-feedback="The Bit Offset can not overlap with any other ID Info"
                        >
                            <b-form-input type="number" min="0"
                                          id="bit-offset-input"
                                          v-model="newBitOffset"
                                          :state="newBitOffsetState"
                                          required
                            ></b-form-input>
                        </b-form-group>
                    </form>
                </b-modal>
                <div id="idInfoItems" class="input-group" v-for="idInfo in this.decoderAsJson.idPeekInfoList" :key="idInfo.id">
                    <div class="form-group" id="bitLengthGroup" style="right-padding: 50px; padding-top: 8px;">
                        <label class="float-label" for="bitLengthInput">Bit Length</label>
                        <input id="bitLengthInput" type="number" min="1" placeholder="8" aria-label="bitLengthInput"
                               v-model="idInfo.bitLength"
                               @keyup="changeIdInfo(idInfo)">
                    </div>
                    <div class="form-group" id="bitOffsetGroup" style="padding-top: 8px;">
                        <label class="float-label" for="bitOffsetInput">Bit Offset</label>
                        <input id="bitOffsetInput" type="number" min="0" class="" placeholder="0" aria-label="bitOffsetInput"
                               v-model="idInfo.bitOffset"
                               @keyup="changeIdInfo(idInfo)">
                    </div>
                    <b-button variant="danger" @click="confirmDelete(idInfo)" style="float: right;">Delete</b-button>
                </div>
            </div>
            <div id="messageIdMapInput" class="input-group" >
                <label style="float: right; padding-right: 50px; padding-top: 8px;">Message to ID</label>
                <b-button v-b-modal.modal-add-mapping variant="success"> Add Message ID Mapping </b-button>
                <b-modal
                        id="modal-add-mapping"
                        ref="add-mapping-modal"
                        title="Add New Message ID Mapping"

                        @ok="handleOk"
                >
                    <form ref="addItemForm" @submit.stop.prevent="handleSubmit">
                        <b-form-group :state="newBitLengthState"
                                      label="Bit Length"
                                      label-for="bit-length-input"
                                      invalid-feedback="The Bit Length can not overlap with any other ID Info"
                        >
                            <b-form-input id="bit-length-input" type="number" min="1"
                                          v-model="newBitLength"
                                          :state="newBitLengthState"
                                          required
                            ></b-form-input>
                        </b-form-group>
                    </form>
                </b-modal>
                <div id="messageIdMappingItems" class="input-group" v-for="mapping in this.decoderAsJson.idToMessageMap" :key="mapping.id">

                    <b-button variant="danger" @click="confirmDeleteMapping(idInfo)" style="float: right;">Delete</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "StaticIdDecoder",
    props: {
      decoderAsJson: Object,
    },

    data(){
      return {
        description: "A static ID decoder is the a simple standard for looking at a given input stream and will peek at selected bits that describe a messages ID."+
            "Based on the value of the ID fields found it will consult a dictionary to determine how to decode the rest of the message and then read from the input stream until the message is fully decoded."+
            "For Example: A interface may always send messages with the ID being a combination of two 4 bit fields that are from bit 5 to 8 and then bit 13 to 16 "+
            "The decoder will then look for these static ID's and if values for the ID field are registered with the decoder the decoder will read the full message and pass it off to be further processed.",

        staticIDsDescription: "Static ID Information is an item that tells the decoder what bits of a stream make up an ID. These ID's will be paired together to make an "+
                "ID to message mapping. Because each ID maps to a value within a message it is suggested that each ID maps directly to a field in all messages that the decoder decodes."+
                " Finally  no ID's can overlap.",

        nameInvalid: false,
        // TODO validate individual messages and id infos
        //bitLengthInvalid: false,
        //bitOffsetInvalid: false,

        newBitLengthState: true,
        newBitLength: 0,
        newBitOffsetState: true,
        newBitOffset: 0
      }
    },

    computed: {
      decoderConfigName: function(){
        if(this.decoderAsJson && this.decoderAsJson.configurationName)
          return this.decoderAsJson.configurationName
        return ""
      }
    },

    methods: {
      changeIdInfo(idInfo){
        console.log(idInfo)
        // TODO make sure that no two fields overlap, if they do make the field be invalid
      },

      changeDecoderData(){
        this.$emit('validateData', this)
        this.$emit('dataChanged', this)
      },

      confirmDelete(idInfo){
        this.$dialog
          .confirm('Are you sure you wish to delete this ID Info?')
          .then( () => {
            for(var index=0; index < this.decoderAsJson.idPeekInfoList.length; index++)
            {
              if(this.decoderAsJson.idPeekInfoList[index] == idInfo) {
                this.decoderAsJson.idPeekInfoList.splice(index)
                this.$emit('dataChanged', this)
              }
            }
          })
          .catch( error => function() {
            console.log("Aborting delete the field with error: "+error);
          });
      },

      /*
       * Modal methods for adding a new ID Info
       */
      checkFormValidity() {

        this.newBitLengthState = this.newBitLength > 1 ? true : false
        this.newBitOffsetState = this.newBitOffset > 0 ? true : false

        // Check to see if the offset and length is within any other ID infos
        this.decoderAsJson.idPeekInfoList.forEach( idInfo => {
          var newEndpoint = this.newBitOffset + this.newBitLength

          if(idInfo.bitOffset <= this.newBitOffset &&
            this.newBitOffset < (idInfo.bitOffset+idInfo.bitLength) ) {
            this.newBitOffsetState = false;
          }

          if( newEndpoint <= (idInfo.bitOffset+idInfo.bitLength) &&
              newEndpoint > idInfo.bitOffset){
            this.newBitLengthState = false
          }

          // Does it engulf the id field
          if( this.newBitOffset < idInfo.bitOffset &&
              newEndpoint > (idInfo.bitOffset+idInfo.bitLength) ){
            this.newBitLengthState = false
          }

          return (this.newBitLengthState && this.newBitOffsetState)
        })
        return (this.newBitLengthState && this.newBitOffsetState)
      },


      resetAddModal(){
        this.newBitLengthState = null
        this.newBitLength = "1"
        this.newBitOffsetState = null
        this.newBitOffset = "0"
      },

      handleOk(bvModalEvt){
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },

      handleSubmit(){
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        // Create a new Data Word
        var newIdInfo = {
          bitLength: this.newBitLength,
          bitOffset: this.newBitOffset
        }
        this.decoderAsJson.idPeekInfoList.push(newIdInfo)
        this.changeDecoderData()

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-add-word')
        })
      }
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
