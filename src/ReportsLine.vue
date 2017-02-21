<template>
    <v-list-item>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon class="material-icons icon grey lighten-1 white--text" v-if="!file()">folder</v-icon>
          <v-icon class="material-icons icon grey lighten-1 white--text" v-else>insert_drive_file</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-on:click.stop.prevent="goTo()" v-if="!file()">{{ infos.name }}</v-list-tile-title>
          <router-link :to="routeToViz" v-else>
            <v-list-tile-title >{{ infos.name }}</v-list-tile-title>
          </router-link>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple v-if="!file()">
            <v-icon class="grey--text text--lighten-1" >autorenew</v-icon>
          </v-btn>
          <v-btn icon ripple >
            <v-icon class="grey--text text--lighten-1">visibility</v-icon>
          </v-btn>
          
        </v-list-tile-action>
      </v-list-tile>
    </v-list-item>
</template>

<script type="text/javascript">
  import _ from "lodash";

  export default {
    props: ['infos'],
    methods: {
      goTo: function(e){
        this.$store.dispatch('goToFolder', this.infos.path);
      },
      file: function(){
        return _.find(this.infos.children, (elem) => {
          return elem.name == "browsertime.xray.json"
        });
      }
    },
    computed: {
      routeToViz: function(){
        var hostname = this.$store.state.currentFolder.name;

        return "reports/" + hostname + "/" + this.infos.name;
      }
    }  
  }
</script>