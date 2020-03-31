<!--- Component that  allows for a veritcle scrolling thable that displays UT components allowing selection --->


<template>
    <div item_selection_table>
        <h1> {{item_type}} Configuration Items </h1>
        <table id="item_scroll_table" class="table-responsive table-striped table-bordered table-sm" cellspacing="0"
               width="100%">
            <thead>
            <tr>
                <th class="th-sm">Item Name
                </th>
                <th class="th-sm">Created By
                </th>
                <th class="th-sm">project_name
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in this.item_list" :key="item.id" @click="updateClickedItem(item)">
                <td>{{item.configurationName}}</td>
                <td>{{item.createdBy}}</td>
                <td>{{item.projectName}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "ComponentSelectionTable",
    props: {
      item_type: String,
      item_list: Array
    },
    data() {
      return {
        clickedItem: null
      }
    },
    methods: {
      ...mapActions([
        "setSelectedConfigurationItem"
      ]),

      updateClickedItem(clickedItem) {
        this.clickedItem = clickedItem
        this.setSelectedConfigurationItem(clickedItem)
      }
    }

  }
</script>

<style scoped>

</style>
