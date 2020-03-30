<template>
    <div class="home-view-container">
        <h1> Messages </h1>
        <MainStage
                :items="this.$store.state.messages"
                :item-type="this.$store.state.dataType"
        />
    </div>
</template>

<script>
  import MainStage from "@/components/MainStage";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "Messages",
    data() {
      return {
        dataType: "messages"
      }
    },
    components: {
      MainStage
    },
    computed: {
      ...mapGetters([
        "getAllMessages"
      ])
    },
    methods: {
      ...mapActions([
        "loadMessages",
        "setCurrentlySelectedData"
      ]),
    },

    mounted: function () {
      this.loadMessages()
      this.setCurrentlySelectedData(this.dataType)
    },
  }
</script>

<style scoped>

</style>
