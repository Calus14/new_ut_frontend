<template>
    <div class="home-view-container">
        <h1> Transport Configurations </h1>
        <MainStage
                :items="this.$store.state.transportConfigurations"
                :item-type="this.$store.state.dataType"
        />
    </div>
</template>

<script>
  import MainStage from "@/components/MainStage";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "TransportConfigurations",
    data() {
      return {
        dataType: "Transport Configurations"
      }
    },
    components: {
      MainStage
    },
    computed: {
      ...mapGetters([
        "getAllTransportConfigurations"
      ])
    },
    methods: {
      ...mapActions([
        "loadTransportConfigurations",
        "setCurrentlySelectedData"
      ]),
    },

    mounted: function () {
      this.loadTransportConfigurations(this.$store.state.selectedProject, this.$store.state.selectedPlatform)
      this.setCurrentlySelectedData(this.dataType)
    },
  }
</script>

<style scoped>
    @import './../styles/mainStyles.scss';

</style>
