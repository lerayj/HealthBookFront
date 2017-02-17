<template>
    <v-list-item>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon class="material-icons icon grey lighten-1 white--text">folder</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-on:click.stop.prevent="goTo()">{{ infos.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon class="grey--text text--lighten-1">autorenew</v-icon>
          </v-btn>
          <v-btn icon ripple>
            <v-icon class="grey--text text--lighten-1">visibility</v-icon>
          </v-btn>
          
        </v-list-tile-action>
      </v-list-tile>
    </v-list-item>
</template>

<script type="text/javascript">
    export default {
        props: ['infos'],
        methods: {
          goTo: function(e){
            this.$store.dispatch('goToFolder', this.infos.path);
          }
        }
    }
</script>