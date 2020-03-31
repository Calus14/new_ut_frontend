<!--- Component that holds the information for a given UT item --->

<template>
    <div id="item_display">
        <h3>
            {{item.configurationName}}
        </h3>
        <Message
            :message-as-json-string="messageAsJson"
        />
    </div>
</template>

<script>

  import Message from "@/components/messaging/Message";

  export default {
    name: "ItemDisplay",

    components: {
      Message
    },

    props: {
      item: Object
    },

    data() {
      return {
      }
    },

    created() {
      console.log("item created")
    },

    computed:
    {
      messageAsJson: function(){
        if(this.item) {
          return this.item.messageAsJson
        }
        return ""
      }
    },

    methods: {
    }

  }
</script>

<style scoped>

</style>
