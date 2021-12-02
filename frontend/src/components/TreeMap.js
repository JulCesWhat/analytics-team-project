import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useNavigate } from "react-router-dom";

export default function TreeMap({ data, indicatorOption, colorOption, width, height }) {
  const svgRef = useRef(null);
  const navigate = useNavigate();
  // const legendRef = useRef(null);

  function renderTreemap() {
    const svg = d3.select(svgRef.current);
    svg.selectAll('g').remove();
    svg.selectAll('text').remove()

    // const legendContainer = d3.select(legendRef.current);
    // legendContainer.selectAll('g').remove();

    svg.attr('width', width).attr('height', height);

    // create root node
    const root = d3
      .hierarchy(data)
      .sum((d) => d[indicatorOption])
      .sort((a, b) => b[indicatorOption] - a[indicatorOption]);

    // create treemap layout
    const treemapRoot = d3.treemap().size([width, height])
      .paddingTop(28)
      .paddingRight(7)
      .paddingInner(3)(root);

    // create 'g' element nodes based on data
    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    // create color scheme and fader

    const colorScale = d3.scaleOrdinal()
      .domain(["gain", "loss"])
      .range(["#009900", "#CC0000"]);

    // add treemap rects
    nodes
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => colorScale(d.data.move))
      .attr('class', (d) => d.data.ticker)
      .on("click", function () {
        const stockName = this.className.baseVal;
        navigate(`/stock/${stockName}`);
      });

    const fontSize = 12;

    // add text to rects
    nodes.append('text')
      .text((d) => `${d.data.ticker}`)
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr('font-size', `${fontSize + 4}px`)
      .attr('x', (d) => (d.x1 - d.x0) / 2)
      .attr('y', (d) => ((d.y1 - d.y0) / 2) - 7)
      .attr('class', (d) => d.data.ticker)
      .call(wrapText)
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .on("click", function () {
        const stockName = this.className.baseVal;
        navigate(`/stock/${stockName}`);
      })

    nodes.append('text')
      // .text((d) => `${d.data[keyValue].toLocaleString('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // })}`)
      .text((d) => `${d.data[indicatorOption]}`)
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      .attr('x', (d) => (d.x1 - d.x0) / 2)
      .attr('y', (d) => ((d.y1 - d.y0) / 2) + 7)
      .attr('class', (d) => d.data.ticker)
      .call(wrapText)
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .on("click", function () {
        const stockName = this.className.baseVal;
        navigate(`/stock/${stockName}`);
      });

    function wrapText(selection) {
      selection.each(function () {
        const node = d3.select(this);
        const rectWidth = +node.attr('data-width');
        let word;
        const words = node.text().split(' ').reverse();
        let line = [];
        let lineNumber = 0;
        const x = node.attr('x');
        const y = node.attr('y');
        let tspan = node.text('').append('tspan').attr('x', x).attr('y', y);
        while (words.length > 1) {
          word = words.pop();
          line.push(word);
          tspan.text(line.join(' '));
          const tspanLength = tspan.node().getComputedTextLength();
          if (tspanLength > rectWidth && line.length !== 1) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = addTspan(word);
          }
        }
        addTspan(words.pop());

        function addTspan(text) {
          lineNumber += 1;
          return node
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', `${lineNumber * fontSize}px`)
            .text(text);
        }
      });
    }

    // Add title for the 3 groups
    svg.selectAll("titles")
      .data(root.descendants().filter(function (d) { return d.depth == 1 }))
      .enter()
      .append("text")
      .attr("x", function (d) { return d.x0 })
      .attr("y", function (d) { return d.y0 + 21 })
      .text(function (d) { return d.data.name })
      .attr("font-size", "19px")
      .attr("fill", "grey")
    // .attr("fill", function (d) { return color(d.data.name) })


    // Add title for the 3 groups
    svg.append("text")
      .attr("x", (width / 2) - 100)
      .attr("y", 14)    // +20 to adjust position (lower)
      .text("Stock Tree Graph")
      .attr("font-size", "19px")
      .attr("fill", "grey")
  }

  useEffect(() => {
    renderTreemap();
  }, [data, indicatorOption, colorOption]);

  return (
    <div>
      <svg ref={svgRef} />
      {/* <svg ref={legendRef} /> */}
    </div>
  );
}