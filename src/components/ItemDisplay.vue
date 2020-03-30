<!--- Component that holds the information for a given UT item --->

<template>
    <div id="item_display">
        <h1>
            Here Is the table
        </h1>
        <code>
            {{JSON.stringify(messageAsJson)}}
        </code>
    </div>
</template>

<script>
  export default {
    name: "ItemDisplay",
    props: {
      item: Object
    },
    data() {
      return {
      }
    },

    computed:
    {
      messageAsJson: function(){
        console.log("Here is the item" + this.item)
        if(this.item)
          return this.item.messageAsJson
        return ""
      }
    },

    methods: {
    }

  }
</script>

<style scoped>

</style>
