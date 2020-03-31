<template>
    <div id="dataWord" >
        <div id="wordClassSelector" class="input-group">
            <div class="form-group dropdown">
                <b-dropdown class="m-md-1" id="classDropDownMenuButton" :text="displayedWordClassName">
                    <b-dropdown-item v-for="item in this.possibleWordClasses" :key="item.id" @click="setWordClass(item)">{{item.name}}</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="form-group">
                <p>
                    {{currentClassDescription}}
                </p>
            </div>
        </div>

        <div id="wordNameSection" class="input-group">
            <div class="form-group" id="nameGroup">
                <label class="float-label" for="nameInput">Word Name</label>
                <input id="nameInput" type="text" class="" placeholder="Word Name" aria-label="nameInput"
                       :class="{ incorrectInput : nameInvalid }"
                       v-model="wordName"
                       @keyup="parentMessage.validateDataWord(selfPointer)">
            </div>
        </div>

        <div id="byteInputSection" class="input-group">
            <div class="form-group" id="bitLengthGroup">
                <label class="float-label" for="byteLengthInput">Byte Length</label>
                <input id="byteLengthInput" type="number" class="" placeholder="1" aria-label="byteLengthInput"
                       @keypress="validateByteChange"
                       :class="{ incorrect : numberOfByteInvalid }"
                       v-model="numberOfBytes">
            </div>
        </div>

        <div id="fieldSection" class="input-group">
            <div class="form-group" id="fieldGroup">
                <label >Data Fields</label>
                <div v-for="dataField in this.dataFields" :key="dataField.id" class="form-group" id="individualField">
                    <Field
                        :field-as-json-string="JSON.stringify(dataField)"
                        :parent-word="selfPointer"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Field from "@/components/messaging/Field";

  export default {
    name: "Word.vue",

    components:{
      Field
    },

    props: {
      wordAsJsonString: String,
      parentMessage: Object
    },

    data() {
      return {
        possibleWordClasses: [
          {
            name: 'StandardDataWord',
            description: "Standard DataWord Class that most interfaces will use with exception in a few cases. Data words will generally have identifying fields that are just static fields which define how to unpack the rest of the bytes"
          }
        ],

        dataFields: [],
        wordName: "",
        nameInvalid: false,
        wordClassName: "",
        numberOfBytes: 1,
        numberOfByteInvalid: false,

        currentClassDescription: "",

        largestNumberOfBytes: 0
      }
    },


    watch: {
      wordAsJsonString: {
        immediate: true,
        handler() {

          const json = JSON.parse(this.wordAsJsonString)
          this.wordName = json.wordName
          this.wordClassName = String(json.myClassName).split('.').pop()

          this.possibleWordClasses.forEach( item => {
            if(item.name === this.messageClassName){
              this.currentClassDescription = item.description
            }
          } )

          this.numberOfBytes = json.numberOfBytes
          this.dataFields = json.dataFields


          if(this.parentWord != null){
            this.parentWord.validateDataWord(this)
          }
        }
      }
    },

    methods:{
      validateField(field){
        this.calculateLargestNumberOfBytesNeeded()

        // Check to see if the field name is unique with all other fields in the word
        var invalidName = false
        this.$children.forEach( dataField => {
          if(dataField === field || invalidName)
            return

          if(dataField.fieldName === field.fieldName)
            invalidName = true
        })
        field.nameInvalid = invalidName

        // Check to see if the bitOffset would be within any other field
        var invalidOffset = false
        this.$children.forEach( dataField => {
          if(dataField === field || invalidOffset)
            return

          if(field.bitOffset >= dataField.bitOffset && field.bitOffset < (dataField.bitOffset + dataField.bitLength)) {
            invalidOffset = true
          }
        })
        field.bitOffsetInvalid = invalidOffset

        // Check to see if the bitEndpoint would be within any other field
        var invalidEndpoint = false
        this.$children.forEach( dataField => {
          if(dataField === field || invalidEndpoint)
            return

          if( (field.bitOffset+field.bitLength) > dataField.bitOffset && (field.bitOffset+field.bitLength) <= (dataField.bitOffset + dataField.bitLength)) {
            invalidEndpoint = true
          }
        })
        field.bitLengthInvalid = invalidEndpoint
        console.log(field.bitLengthInvalid)

        // Check to see if the data will fit into the bit length
        field.dataInvalid =  field.dataValue >= Math.pow(2, field.bitLength) ? true : false

        // Check to see if the bit offset would be out of the words limit
        field.bitOffsetInvalid = field.bitOffset >= (this.numberOfBytes * 8) ? true : false

        // Check to see if the final bit of the field goes past the word
        field.bitLengthInvalid = (parseInt(field.bitOffset) + parseInt(field.bitLength)) > (this.numberOfBytes * 8) ? true : false
      },

      // Helper method to calculate the farthest byte our sub fields need
      calculateLargestNumberOfBytesNeeded(){
        var farthestBit = 0
        this.dataFields.forEach( dataField =>{
          var fieldLastBit = dataField.bitLength + dataField.bitOffset
          if(fieldLastBit > farthestBit)
            farthestBit = fieldLastBit
        })

        this.largestNumberOfBytes = Math.ceil(farthestBit/8)
      },

      // Method that makes sure the bytes we are changing too will be able to hold all existing fields
      validateByteChange(){
        if(this.numberOfBytes < this.largestNumberOfBytes)
          this.numberOfByteInvalid = true
        else
          this.numberOfByteInvalid = false
      },

      setWordClass(classItem){
        this.wordClassName = classItem.name
        this.currentClassDescription = classItem.description
      }
    },

    computed: {
      selfPointer: function(){
        return this
      },

      displayedWordClassName: function() {
        if(this.wordClassName.length == 0)
          return "Word Type"
        return this.wordClassName
      }
    },
  }
</script>

<style scoped>
    @import '../../styles/mainStyles.scss';

    .float-label{
        float: left;
        text-align: right;
        margin-right: 5px;
    }
</style>
