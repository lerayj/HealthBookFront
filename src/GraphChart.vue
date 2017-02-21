<template>
    <div>
        <svg width="960" height="600"><rect style="width:100%;height:100%;" fill="black"></rect></svg>
    </div>
</template>

<script type="text/javascript">
    import * as d3 from 'd3';

    export default {
        name: 'GraphChart',
        props: ['data'],

        mounted(){
            console.log("HAR on mounted: ", this.data);
            
            var svg = d3.select("svg"),
              width = +svg.attr("width"),
              height = +svg.attr("height");

            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var simulation = d3.forceSimulation()
              .force("link", d3.forceLink().id(function(d) { return d.id; }))
              .force("charge", d3.forceManyBody())
              .force("center", d3.forceCenter(width / 2, height / 2));


            var link = svg.append("g")
                .attr("class", "links")
              .selectAll("line")
              .data(this.data.links)
              .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

              var maxNodeValue = d3.max(this.data.nodes, e => e.value);


            var node = svg.append("g")
                .attr("class", "nodes")
              .selectAll("circle")
              .data(this.data.nodes)
              .enter().append("circle")
                .attr("r", (d) => {
                  console.log("d.value: ", d.value, " maxNodeValue: ", maxNodeValue);
                  console.log("Scale: ", (d.value) / maxNodeValue);
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

            simulation
                .nodes(this.data.nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(this.data.links).distance(50);

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
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            }

            function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            }

            function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            }

            function clicked(d, i) {
            if (d3.event.defaultPrevented) return; // dragged
            console.log("d: ", d, " i: ", i, "this: ", this);
            var initialRad = d3.select(this).attr("r");
            console.log("init: ",initialRad );
            d3.select(this).transition()
                .style("fill", "black")
                .attr("r", 64)
              .transition()
                .attr("r", initialRad)
                .style("fill", color(i));
            }
        }
    }
</script>

<style scoped>
    svg{
        width: 100%;
        height: 600px;
    }

    .links line {
      stroke: #999;
      stroke-opacity: 0.6;
    }

    .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
    }
</style>
