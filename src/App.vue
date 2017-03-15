<template>
  <v-app top-navbar footer>
      <v-toolbar>
        <v-toolbar-logo>HealthBook</v-toolbar-logo>
        <v-toolbar-items class="toolItemlinks">
        
          <v-toolbar-item><router-link to="/dashboard">Dashboard</router-link></v-toolbar-item>
          <v-toolbar-item><router-link to="/">All Reports</router-link></v-toolbar-item>
          <v-toolbar-item><router-link to="/admin/users">Users</router-link></v-toolbar-item>
          <v-toolbar-item><router-link to="/login">Login</router-link></v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>

          <div v-if="logged">CONNECTED</div>
          <div v-else>NOT CONNECTED</div>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
    <v-footer>
      <div class="text-xs-right">© 2017</div>
    </v-footer>
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
    computed: {
      logged (){
        console.log("this.$store.user: ", this.$store.getters.isLogged);
        return this.$store.getters.isLogged;
      }
    }
  }
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main'
  @import './css/main.css'

  .toolItemlinks a{
    color white
  }
</style>