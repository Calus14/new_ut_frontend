<template>
  <div class="home-view-container">
    <MainStage
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainStage from "@/components/MainStage";

export default {
  name: 'home',
  data() {
    return {
    }
  },
  components : {
    MainStage
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      "setCurrentlySelectedData"
    ]),
  mounted: function () {
    this.setCurrentlySelectedData("")
  },

  }
}
</script>
