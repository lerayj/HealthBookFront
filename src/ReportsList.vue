<template>
<div>
  <div v-if="!reports">
  No Data
  </div>

  <v-card v-else>
  <v-toolbar class="light-blue">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>My Reports</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
  <v-list two-line sub-header>
    <v-list-sub-header inset>Folders</v-list-sub-header>
    <ReportsLine v-for="item in reports" v-bind:infos="item"/>
  </v-list>
</v-card>
</div>

</template>

<script type="text/javascript">
  import ReportsLine from './ReportsLine.vue';

  export default {
    components: {
      ReportsLine
    },
    computed: {
      reports () {
        var currentFolder = this.$store.state.currentFolder;
        if(currentFolder)
            return currentFolder.children;

      }
    }
  }
</script>

<style type="text/css">
    
</style>