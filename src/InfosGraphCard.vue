<template>
  <v-card class="mb-3" style="height:600px;overflow:auto;">
    <v-toolbar class="white--text deep-purple darken-3">
        <v-toolbar-title v-if="node">{{node.id}} -> {{nodeValue}}</v-toolbar-title>
        <v-toolbar-title v-else>Global</v-toolbar-title>
    </v-toolbar>

    <v-list-sub-header v-text="'Infos'"/>
    <div v-if="node">
        <v-list two-line >
          <v-list-item>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                    Cookie dropped:
                </v-list-tile-title>
                <v-list-tile-sub-title>
                    21
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
          </v-list-item>
        </v-list>
    </div>

<v-list-sub-header v-text="'Host'"/>
    <div v-if="node">
        <v-list two-line >
          <v-list-item v-for="item in linksTargets">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                    {{item.source.id}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                    {{item.value}} datas
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
          </v-list-item>
        </v-list>
    </div>
    <v-list-sub-header v-text="'Referrer'"/>
    <div v-if="node">
        <v-list two-line >
          <v-list-item v-for="item in linksSources">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                    {{item.target.id}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                    {{item.value}} datas
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
          </v-list-item>
        </v-list>
    </div>

    <div v-else>
        <v-card-text >Click on any node to get more details!</v-card-text>
    </div>
        <!-- Node: {{node}} -->

  </v-card>
</template>

<script type="text/javascript">
    import numeral from 'numeral';

    export default {
        props: ['data', 'node'],
        computed: {
            linksTargets : function(){
                console.log("NODE FROM CARDGRAPH: ", this.$store.state.selectedGraphNode, " data: ", this.data);
                if(this.node){
                    var id = this.node.id;
                    console.log("links: ", _.filter(this.data.links, e =>  (e.target && e.target.id == id)));

                    return _.filter(this.data.links, e =>  (e.target && e.target.id == id));
                } else{
                    return "Click on a node!";
                }
            },
            linksSources: function(){
                if(this.node){
                    var id = this.node.id;
                    return _.filter(this.data.links, e =>  (e.source && e.source.id == id));
                }  
            },
            nodeValue: function(){
                return numeral(this.node.value).format('0,0').replace(',', ' ');
            }
        }
    }
</script>

<style scoped>
    .svgSize{
        height: 600px;
        overflow: 
    }
</style>