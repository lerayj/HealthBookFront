<template>
    <v-col xs4="xs4">
    <v-card class="mb-3">
      <v-toolbar class="white--text deep-purple darken-3">
        <v-toolbar-title>
            {{headTitle}}
            <v-chip class="white--text amber darken-4 text-xs-right fr">
                {{nbCookiesDomain}}
            </v-chip>
        </v-toolbar-title>
      </v-toolbar>

        <v-expansion-panel>
          <v-expansion-panel-content v-for="subdomain in subdomains">
            <div slot="header" style="width:100%">
                {{subdomain.subdomain}}
                <v-chip class="white--text indigo darken-3 fr mr-5">{{subdomain.cookies.length}}</v-chip>
            </div>

              <v-list two-line>
                <v-list-item v-for="cookie in subdomain.cookies">
                  <v-list-tile avatar ripple>
                    <v-list-tile-content>
                      <v-list-tile-title>{{cookie.key}}</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{cookie.value}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-list-item>
              </v-list>

          </v-expansion-panel-content>
        </v-expansion-panel>


    </v-card>
    </v-col>
</template>





<script type="text/javascript">
    import _ from "lodash";

    export default {
        props:['headTitle', 'subdomains'],
        computed: {
            nbCookiesDomain: function(){
                return _.reduce(this.subdomains, (sum, e) => {
                    return e.cookies.length + sum;
                }, 0);
            }
        }   
    }
</script>

<style type="text/css">
    .fr{
        float: right;
    }
</style>