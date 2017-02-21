<template>
    <div>
    <GraphChart v-bind:data="graphData()" v-if="graphData()"/>
    <div v-else>Waiting for data</div>
    <v-card>
        <v-card-row class="green darken-1">
            <v-card-title>
                <span class="white--text">Marriot Rewards</span>
                <v-spacer></v-spacer>
            </v-card-title>
        </v-card-row>
        <v-card-row>
            <v-card-text>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </v-card-text>
        </v-card-row>
    </v-card>
    </div>
</template>

<script type="text/javascript">
    import GraphChart from './GraphChart.vue';
    import urlParse from 'url-parse';

    export default {
        components: {
            GraphChart
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData (){
                console.log("Params: ", this.$route.params);
                this.$store.dispatch('fetchHarData', this.$route.params);
            },
            graphData: function(){
                console.log("HAR graph data: ", this.$store.state.har);
                var har = this.$store.state.har;
                if(har){
                  var assets = har[2].assets;
                  console.log("assets: ", assets);
                  var results = _.chain(assets)
                      .groupBy((ite) => {
                          if(ite.headers.request.referer)
                            return urlParse(ite.headers.request.referer).hostname;
                      })
                      .map((hosts, referer) => {
                          var count = _.countBy(hosts, (ite) => {
                              return ite.headers.request.host;
                          });
                          return {referer: referer, hosts: hosts, count};
                      })
                      .value();


                  var links = [];
                  _.each(results, (elem) =>{
                      var ref = elem.referer;
                      _.each(elem.count, (temp, key) => {
                          links.push({source: ref, target: key, value: temp})
                      });
                  });

                  var sourceUniq = _.chain(links)
                      .uniqBy((elem) => {
                          return elem.source;
                      })
                      .map(elem => elem.source)
                      .value();

                  var targetUniq = _.chain(links)
                      .uniqBy((elem) => {
                          return elem.target;
                      })
                      .map(elem => elem.target)
                      .value();

                  var final = _.concat(sourceUniq, targetUniq);

                  _.each(final, (elem) => {
                      if(har[2].domains[elem])
                          console.log("OK go: ", har[2].domains[elem]);

                  });

                  var nodes = _.map(final, (elem, key) => {
                      console.log("key: ", key);
                      var val = 5;
                      if(har[2].domains[elem])
                          val = har[2].domains[elem].transferSize;
                      return {id: elem, group: key, value: val}
                  });

                  var graph = {nodes, links};
                  return graph;
                  console.log("graph: ", graph);
                }
                return har;
            }
        }
    }
</script>