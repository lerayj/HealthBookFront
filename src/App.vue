<template>
  <v-app top-navbar>
    <header>
      <v-toolbar>
        <v-toolbar-logo>HealthBook</v-toolbar-logo>
        <v-toolbar-items>
          <v-toolbar-item><router-link to="/">All Reports</router-link></v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    </header>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import store from './main.js';
  import GraphChart from './GraphChart.vue';
  import ReportsList from './ReportsList.vue';

  export default {
    components: {
      GraphChart: GraphChart,
      ReportsList: ReportsList
    },
    data () {
      return {
        item: {
          text: 'Get Started'
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main'
  @import './css/main.css'
</style>