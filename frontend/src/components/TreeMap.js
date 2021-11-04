import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function TreeMap({ data, width, height }) {
  const svgRef = useRef(null);
  const legendRef = useRef(null);

  function renderTreemap() {
    const svg = d3.select(svgRef.current);
    svg.selectAll('g').remove();

    // const legendContainer = d3.select(legendRef.current);
    // legendContainer.selectAll('g').remove();

    svg.attr('width', width).attr('height', height);

    // create root node
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    // create treemap layout
    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

    // create 'g' element nodes based on data
    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    // create color scheme and fader

    const colorScale = d3.scaleOrdinal()
    .domain(["gain", "loss"])
    .range([ "#009900", "#CC0000"])

    // add treemap rects
    nodes
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => colorScale(d.data.move));

    const fontSize = 12;

    // add text to rects
    nodes
      .append('text')
      .text((d) => `${d.data.name}`)
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr('font-size', `${fontSize + 4}px`)
      .attr('x', (d) => (d.x1 - d.x0) / 2)
      .attr('y', (d) => ((d.y1 - d.y0) / 2) - 7)
      .call(wrapText)
      .style('text-anchor', 'middle')
      .style('fill', 'white')

    nodes
      .append('text')
      .text((d) => `${d.data.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}`)
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      .attr('x', (d) => (d.x1 - d.x0) / 2)
      .attr('y', (d) => ((d.y1 - d.y0) / 2) + 7)
      .call(wrapText)
      .style('text-anchor', 'middle')
      .style('fill', 'white')

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

    // // pull out hierarchy categories
    // let categories = root.leaves().map((node) => node.data.category);
    // categories = categories.filter(
    //   (category, index, self) => self.indexOf(category) === index,
    // );

    // legendContainer.attr('width', width).attr('height', height / 4);

    // // create 'g' elements based on categories
    // const legend = legendContainer.selectAll('g').data(categories).join('g');

    // // create 'rects' for each category
    // legend
    //   .append('rect')
    //   .attr('width', fontSize)
    //   .attr('height', fontSize)
    //   .attr('x', fontSize)
    //   .attr('y', (_, i) => fontSize * 2 * i)
    //   .attr('fill', (d) => colorScale(d));

    // // add text to each category key
    // legend
    //   .append('text')
    //   .attr('transform', `translate(0, ${fontSize})`)
    //   .attr('x', fontSize * 3)
    //   .attr('y', (_, i) => fontSize * 2 * i)
    //   .style('font-size', fontSize)
    //   .text((d) => d);
  }

  useEffect(() => {
    renderTreemap();
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} />
      <svg ref={legendRef} />
    </div>
  );
}