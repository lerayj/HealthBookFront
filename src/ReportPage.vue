<template>
    <div>
      <GraphChart v-bind:data="graphData()" v-if="graphData()"/>
      <div v-else>Waiting for data</div>
      <h2>Cookies</h2>
      <v-row>
      <CookiesCard v-for="item in cookiesData" v-bind:headTitle="item.host" v-bind:list="item.cookies" />
      </v-row>
    </div>
</template>

<script type="text/javascript">
    import GraphChart from './GraphChart.vue';
    import CookiesCard from './CookiesCard.vue';
    import urlParse from 'url-parse';

    export default {
        components: {
            GraphChart,
            CookiesCard
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
          cookiesData : function(){
            var har = this.$store.state.har;
            console.log("cookiesData Undefined");
            if(har){
              console.log("cookiesData OK: ", linkCookiesToDomain(har));

              return linkCookiesToDomain(har);
            }
          }
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
                  linkCookiesToDomain(har);
                  var assets = har[2].assets;
                  //console.log("assets: ", assets);
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

                  var nodes = _.map(final, (elem, key) => {
                      var val = 5;
                      if(har[2].domains[elem])
                          val = har[2].domains[elem].transferSize;
                      return {id: elem, group: key, value: val}
                  });

                  var graph = {nodes, links};
                  return graph;
                  // console.log("graph: ", graph);
                }
                return har;
            }
        }
    }


    function linkCookiesToDomain(harData){
      var assets = harData[2].assets;
      var result = _.chain(assets)
        .filter((elem) => {
          return elem.headers.request["cookie"] && 
          (elem.headers.request.host || elem.headers.request[":authority"])
        })
        .map((elem) => {
          var host = elem.headers.request.host || elem.headers.request[":authority"];
          return {host, cookies: elem.headers.request["cookie"]}
        })
        .groupBy(e => e.host)
        .map((arr, k) => {
          var max = _.reduce(arr, (result, val) => result.lenght < val.lenght ? val : result);
          max.cookies = max.cookies.split("; ");
          max.cookies = _.map(max.cookies, (e) => {
            var temp = e.split('=');
            var key = temp.shift();
            return {key, value: temp.join()};
          });
          return max;
        })
        .value()
        .sort((a, b) => {
          return b.cookies.length - a.cookies.length;
        });
        console.log("result: ", result);
        return result;
        
      };

</script>