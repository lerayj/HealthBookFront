<template>
<div>
  <div v-if="!reports">
  No Data
  </div>

  <v-card v-else>
  <v-toolbar class="light-blue">
    <v-toolbar-side-icon />
    <v-toolbar-title>My Reports</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
  <v-list two-line sub-header>
    <v-list-sub-header inset>Folders</v-list-sub-header>
    <v-list-item v-for="item in reports">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon class="material-icons icon grey lighten-1 white--text">folder</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon class="grey--text text--lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-item>
  </v-list>
</v-card>
</div>

</template>

<script type="text/javascript">
    export default {
      computed: {
        reports () {
          return this.$store.state.reportsFolders;
        }
      }
    }
</script>

<style type="text/css">
    
</style>