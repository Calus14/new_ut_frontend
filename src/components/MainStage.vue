<template>
    <div id="main_stage">
        <div class="container main_container">
            <div class="row">
                <div class="col-sm-4 stage_column">
                    <ItemSelectionTable
                            :item_type="this.itemType"
                            :item_list="this.items"
                    />
                </div>
                <div class="col-sm-8 stage_column">
                    <ItemDisplay
                            :item="getSelectedConfigurationItem"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ItemDisplay from "@/components/ItemDisplay";
  import ItemSelectionTable from "@/components/ItemSelectionTable";
  import {mapGetters} from "vuex";

  export default {
    name: "MainStage",
    components: {
      ItemSelectionTable,
      ItemDisplay
    },
    // These are private data members
    data() {
      return {}
    },

    computed: {
      ...mapGetters([
        "getSelectedConfigurationItem"
      ]),


    },

    // These are public
    props: {
      itemType: String,
      items: Array,
    }
  }
</script>

<style scoped>
    #main_stage {
        margin-left: 5%;
        margin-right: 5%;
    }

    .main_container {
        margin: 25px 0px 25px 0px;
        width: 100%;
    }

    .stage_column {
        outline: 2px double darkblue;
    }
</style>
