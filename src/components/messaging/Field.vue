<template>
    <div id="field" class="field-input-group">

        <div id="fieldNameSection" class="input-group">
            <div class="form-group" id="nameGroup">
                <label class="float-label" for="nameInput">Field Name</label>
                <input id="nameInput" type="text" class="" placeholder="Field Name" aria-label="nameInput"
                       :class="{ incorrectInput : nameInvalid }"
                       v-model="fieldName"
                       @keyup="parentWord.validateField(selfPointer)">
            </div>
        </div>

        <div id="bitInputSection" class="input-group">
            <div class="form-group" id="bitLengthGroup">
                <label class="float-label" for="bitLengthInput">Bit Length</label>
                <input id="bitLengthInput" type="number" class="" placeholder="8" aria-label="bitLengthInput"
                       :class="{ incorrectInput : bitLengthInvalid }"
                       v-model="bitLength"
                       @keyup="parentWord.validateField(selfPointer)">
            </div>
            <div class="form-group" id="bitOffsetGroup">
                <label class="float-label" for="bitOffsetInput">Bit Offset</label>
                <input id="bitOffsetInput" type="number" min="0" class="" placeholder="0" aria-label="bitOffsetInput"
                       :class="{ incorrectInput : bitOffsetInvalid }"
                       v-model="bitOffset"
                       @keyup="parentWord.validateField(selfPointer)">
            </div>
        </div>

        <div id="fieldClassSelector" class="input-group">
            <div class="form-group dropdown">
                <b-dropdown class="m-md-1" id="classDropDownMenuButton" :text="displayedFieldClassName">
                    <b-dropdown-item v-for="item in this.possibleFieldClasses" :key="item.id" @click="setFieldClass(item)">{{item.name}}</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="class-description">
                <p >
                    {{currentClassDescription}}
                </p>
            </div>
        </div>

        <div id="fieldValueSection" class="input-group">
            <div class="form-group" id="fieldValueGroup">
                <label class="float-label" >Default Field Value</label>
                <input v-if="fieldClassName == 'IntegerDataField'" id="integerFieldValueInput" type="number" class="" placeholder="0" aria-label="fieldValueInput"
                       :class="{ incorrectInput : dataInvalid }"
                       v-model="dataValue"
                       @keyup="parentWord.validateField(selfPointer)">
                <input v-if="fieldClassName == 'StaticDataField'" id="staticFieldValueInput" type="number" class="" placeholder="0" aria-label="fieldValueInput"
                       :class="{ incorrectInput : dataInvalid }"
                       v-model="dataValue"
                       @keyup="parentWord.validateField(selfPointer)">
                <div v-if="fieldClassName == 'EnumDataField'" class="dropdown">
                    <b-dropdown class="m-md-1" id="enumFieldValueInput" :text="displayedEnumValue">
                        <b-dropdown-item v-for="item in this.possibleFieldClasses" :key="item.id" @click="setEnumFieldValue(item)">{{item.name}}</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: "Field",

    props: {
      fieldAsJsonString: String,
      parentWord: Object
    },

    data() {
      return {
        possibleFieldClasses: [
          {
            name: 'IntegerDataField',
            description: "A field that can only take in positive or negative whole numbers provided the number will fit into the bit length"
          },
          {
            name: 'EnumDataField',
            description: "A field which has values mapped to present enumerations"
          },
          {
            name: 'StaticDataField',
            description: "A field that which has a value that is unable to be changed and will register errors if any other value is detected"
          }
        ],

        currentClassDescription: "",
        fieldName: "",
        nameInvalid: false,
        bitLength: 8,
        bitLengthInvalid: false,
        bitOffset: 0,
        bitOffsetInvalid: false,
        dataValue: 0,
        dataInvalid: false,
        fieldClassName: '',
        enumFields: [],
        enumDataValue: ''
      }
    },

    watch: {
      fieldAsJsonString: {
        immediate: true,
        handler() {
          const json = JSON.parse(this.fieldAsJsonString)
          this.fieldName = String(json.name)
          this.bitLength = json.bitLength
          this.bitOffset = json.bitOffset
          this.dataValue = json.dataValue
          this.fieldClassName = String(json.myClassName).split('.').pop()

          this.possibleFieldClasses.forEach( item => {
            if(item.name === this.fieldClassName){
              this.currentClassDescription = item.description
            }
          } )

          this.enumFields = json.allowedEnums

          if(this.parentWord != null){
            this.parentWord.validateField(this)
          }
        }
      }
    },

    computed:{
      selfPointer: function(){
        return this
      },

      displayedFieldClassName: function() {
        if(this.fieldClassName.length == 0)
          return "Field Type"
        return this.fieldClassName
      },

      displayedEnumValue: function(){
        if(this.enumDataValue.length == 0){
          return this.enumFields[0].enumName
        }
        return this.enumDataValue
      }
    },

    methods: {
      setFieldClass(classItem){
        console.log(classItem.name+" ")
        this.fieldClassName = classItem.name
        this.currentClassDescription = classItem.description
      },

      setEnumFieldValue(enumItem){
        this.dataValue = enumItem.enumValue
        this.enumDataValue = enumItem.enumName
        this.parentWord.validateField(this.selfPointer)
      }
    }
  }
</script>

<style scoped>

    @import '../../styles/mainStyles.scss';

    .float-label{
        float: left;
        text-align: right;
        margin-right: 5px;
    }

    .field-input-group{
        margin: 8px;
        padding: 5px;
        border-color: #0f1021;
        border-style: inset;
        border-radius: 8px;
    }
</style>
