<template>
<v-row>
  <v-col xs8="xs8">
        <SettingsGraphCard/>
        <svg width="960" height="600"></svg>
  </v-col>
    <v-col xs4="xs4">
      <InfosGraphCard v-bind:node="node" v-bind:data="data"/>
    </v-col>
</v-row>

</template>

<script type="text/javascript">
    import * as d3 from 'd3';
    import InfosGraphCard from './InfosGraphCard.vue';
    import SettingsGraphCard from './SettingsGraphCard.vue';
    import _ from 'lodash';

    export default {
        name: 'GraphChart',
        props: ['data'],
        components: {
          InfosGraphCard,
          SettingsGraphCard
        },
        computed: {
          node: function(){
            return this.$store.state.selectedGraphNode;
          }
        },
        watch: {
          data: function(newData) {
            console.log("WATCH;");
            //TODO:Rework the update
            //this.drawChart(newData);
          }
        },
        methods : {
          drawChart: function(data){
            var self = this;
            var link = this.svg.append("g")
                .attr("class", "links")
              .selectAll("line")
              .data(data.links)
              .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

            var maxNodeValue = d3.max(data.nodes, e => e.value);

            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var node = this.svg.append("g")
                .attr("class", "nodes")
              .selectAll("circle")
              .data(data.nodes)
              .enter().append("circle")
                .attr("r", (d) => {
                  return ((d.value / maxNodeValue) * 20) + 2;
              })
                .attr("fill", function(d) { return color(d.group); })
                .on("click", clicked)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            node.append("title")
                .text(function(d) { return d.id; });

            this.simulation
                .nodes(data.nodes)
                .on("tick", ticked);

            this.simulation.force("link")
                .links(data.links).distance(50);


            function ticked() {
              link
                  .attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

              node
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; });
            }

            function dragstarted(d) {
            if (!d3.event.active) self.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            }

            function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            }

            function dragended(d) {
            if (!d3.event.active) self.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            }

            function clicked(d, i) {
              if (d3.event.defaultPrevented) return; // dragged
              var initialRad = d3.select(this).attr("r");
              d3.select(this).transition()
                  .style("fill", "black")
                  .attr("r", 64)
                .transition()
                  .attr("r", initialRad)
                  .style("fill", color(i));
              self.$store.dispatch('selectedNode', d);
            }
          }
        },
        mounted(){
            var self = this;

            var svg = d3.select("svg"),
              width = +svg.attr("width"),
              height = +svg.attr("height");

            this.svg = svg;

            this.simulation = d3.forceSimulation()
              .force("link", d3.forceLink().id(function(d) { return d.id; }))
              .force("charge", d3.forceManyBody())
              .force("center", d3.forceCenter(width / 2, height / 2));
            
            this.drawChart(this.data);

        }
    }
</script>

<style >
    svg{
        width: 100%;
        height: 600px;
    }

    .links line {
      stroke: #2c3e50;
      stroke-opacity: 0.6;
    }

    .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
    }
</style>
