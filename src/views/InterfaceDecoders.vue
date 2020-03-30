<template>
    <div class="home-view-container">
        <h1> Interface Decoders </h1>
        <MainStage
                :items="this.$store.state.interfaceDecoders"
                :item-type="this.$store.state.dataType"
        />
    </div>
</template>

<script>
  import MainStage from "@/components/MainStage";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "InterfaceDecoders",
    data() {
      return {
        dataType: "interfacedecoder"
      }
    },
    components: {
      MainStage
    },
    computed: {
      ...mapGetters([
        "getAllInterfaceDecoders"
      ])
    },
    methods: {
      ...mapActions([
        "loadInterfaceDecoders",
        "setCurrentlySelectedData"
      ]),
    },

    mounted: function(){
      this.loadInterfaceDecoders(this.$store.state.selectedProject, this.$store.state.selectedPlatform)
      this.setCurrentlySelectedData(this.dataType)
    },
  }

</script>

<style scoped>

</style>
