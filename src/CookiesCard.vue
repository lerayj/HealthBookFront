<template>
    <v-col xs4="xs4">
    <v-card>
      <v-toolbar class="white--text pink">
        <v-toolbar-title>{{headTitle}}</v-toolbar-title>
      </v-toolbar>
      <v-list two-line>
        <v-list-item v-for="item in list">
          <v-list-tile avatar ripple>
            <v-list-tile-content>
              <v-list-tile-title>{{item.key}}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text text--darken-4">{{item.value}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-card>
    </v-col>
</template>

<script type="text/javascript">
    export default {
        props:['headTitle', 'list'],
        computed: {

        }   
    }
</script>
