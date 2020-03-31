<template>
    <div id="interfaceMessage" class="input-group">
        <div id="messageClassSelector" class="input-group">
            <div class="form-group dropdown">
                <b-dropdown class="m-md-1" id="classDropDownMenuButton" :text="displayedMessageClassName">
                    <b-dropdown-item v-for="item in this.possibleMessageClasses" :key="item.id" @click="setMessageClass(item)">{{item.name}}</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="class-description">
                <p >
                    {{currentClassDescription}}
                </p>
            </div>
        </div>

        <div id="messageNameSection" class="input-group">
            <div class="form-group" id="nameGroup">
                <label class="float-label" for="nameInput">Message Name</label>
                <input id="nameInput" type="text" class="" placeholder="Message Name" aria-label="nameInput"
                       :class="{ incorrectInput : nameInvalid }"
                       v-model="messageName">
            </div>
        </div>

        <div id="wordSection" class="input-group">
            <div class="form-group" id="wordGroup">
                <label >Data Words</label>
                <div v-for="dataWord in this.dataWords" :key="dataWord.id" class="word-input-group" id="individualField">
                    <Word
                            :word-as-json-string="JSON.stringify(dataWord)"
                            :parent-message="selfPointer"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Word from "@/components/messaging/Word";

  export default {
    name: "Message",
    components:{
      Word
    },

    props: {
      messageAsJsonString: String,
    },

    data() {
      return {
        possibleMessageClasses: [
          {
            name: 'StandardMessage',
            description: "Standard Interface Message that assumes all data words are unique and known in set order that will not change."
          }
        ],


        messageName: "",
        // TODO validate name by going to the table
        nameInvalid: false,
        messageClassName: '',
        currentClassDescription: "",
        dataWords: [],
      }
    },


    watch: {
      messageAsJsonString: {
        immediate: true,
        handler() {
          try{
            var json = JSON.parse(this.messageAsJsonString)
          }
          catch(e){
            console.log("failed tso parse the message as json string to json")
            console.log(e)
            return
          }

          this.messageName = json.messageName
          this.messageClassName = String(json.myClassName).split('.').pop()

          this.possibleMessageClasses.forEach( item => {
            if(item.name === this.messageClassName){
              this.currentClassDescription = item.description
            }
          } )

          this.dataWords = json.dataWords
        }
      }
    },

    computed: {
      selfPointer: function(){
        return this
      },

      displayedMessageClassName: function() {
        if(this.messageClassName.length == 0)
          return "Message Type"
        return this.messageClassName
      }
    },

    methods:{
      validateDataWord(dataWord){
        // Check to see if the field name is unique with all other fields in the word
        var invalidName = false
        this.$children.forEach( word => {
          if(dataWord === word || invalidName)
            return

          if(word.wordName === dataWord.wordName)
            invalidName = true
        })
        dataWord.nameInvalid = invalidName
      },

      setMessageClass(classItem){
        this.messageClassName = classItem.name
        this.currentClassDescription = classItem.description
      }
    }
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

    .word-input-group{
        margin: 8px;
        padding: 5px;
        border-color: #0F1021;
        border-style: inset;
        border-radius: 8px;
    }

    .float-label{
        float: left;
        text-align: right;
        margin-right: 5px;
    }

</style>
