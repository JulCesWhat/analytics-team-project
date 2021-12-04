import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useNavigate } from "react-router-dom";


function convertToInternationalCurrencySystem(labelValue) {

	// Nine Zeroes for Billions
	return Math.abs(Number(labelValue)) >= 1.0e+9

		? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
		// Six Zeroes for Millions 
		: Math.abs(Number(labelValue)) >= 1.0e+6

			? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
			// Three Zeroes for Thousands
			: Math.abs(Number(labelValue)) >= 1.0e+3

				? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

				: Math.abs(Number(labelValue));

}

export default function TreeMap({ data, industryOptions, industryOption, indicatorOption, colorOption, width, height }) {
	const svgRef = useRef(null);
	const tooltip = useRef(null)
	const navigate = useNavigate();

	const industryColorObject = industryOptions.reduce((prev, curr) => ({ ...prev, [curr.display]: null }), {}) ?? {}

	function renderTreemap() {
		const svg = d3.select(svgRef.current);
		svg.selectAll('g').remove();
		svg.selectAll('text').remove()

		svg.attr('width', width).attr('height', height);

		const tool = d3.select(tooltip.current)

		// create root node
		const root = d3
			.hierarchy(data)
			.sum((d) => d[indicatorOption])
			.sort((a, b) => b[indicatorOption] - a[indicatorOption]);

		// create treemap layout
		const treemapRoot = d3.treemap().size([width, height])
			.paddingTop(15)
			.paddingRight(7)
			.paddingInner(3)(root);

		// create 'g' element nodes based on data
		const nodes = svg
			.selectAll('g')
			.data(treemapRoot.leaves())
			.join('g')
			.attr('transform', (d) => `translate(${d.x0},${d.y0})`);

		// create color scheme and fader

		if (industryOption === 'all_top_5') {
			data.children.forEach((d) => {
				const indicatorArr = d.children
					.reduce((prev, curr) => {
						prev.push(curr[colorOption])
						return prev
					}, [])
				indicatorArr.sort()

				const min = Math.min(...indicatorArr) < 0 ? Math.min(...indicatorArr) : 0
				const max = Math.max(...indicatorArr) > 0 ? Math.max(...indicatorArr) : 0
				const mid = 0

				// console.log(`${min} ${mid} ${max}`)

				industryColorObject[d.name] = d3.scaleLinear()
					.domain([min, mid, max])
					.range(["#990000", "#C0C0C0", "#009900"])
					.unknown("#C0C0C0")
			})
		} else {
			const indicatorArr = data.children
				.reduce((prev, curr) => {
					prev.push(curr[colorOption])
					return prev
				}, [])
			indicatorArr.sort()

			const min = Math.min(...indicatorArr) < 0 ? Math.min(...indicatorArr) : 0
			const max = Math.max(...indicatorArr) > 0 ? Math.max(...indicatorArr) : 0
			const mid = 0

			// console.log(`${min} ${mid} ${max}`)

			industryColorObject[data.name] = d3.scaleLinear()
				.domain([min, mid, max])
				.range(["#990000", "#C0C0C0", "#009900"])
				.unknown("#C0C0C0")
		}


		// add treemap rects
		nodes
			.append('rect')
			.attr('width', (d) => d.x1 - d.x0)
			.attr('height', (d) => d.y1 - d.y0)
			.attr('fill', (d) => {
				const colorS = industryColorObject[d.data.sector](d.data[colorOption])
				return colorS
			})
			.attr('class', (d) => d.data.ticker)
			.attr('val-cur', (d) => {
				const num = d.data[indicatorOption]
				const newNum = convertToInternationalCurrencySystem(num)
				return newNum
			})
			.on("click", function () {
				const stockName = this.className.baseVal;
				navigate(`/stock/${stockName}`);
			})
			.on("mousemove", function (d) {
				const self = d3.select(this)
				const cls = self.attr('class')
				const val_cur = self.attr('val-cur')
				const width = self.attr('width')
				const height = self.attr('height')

				// return width > 50 && height > 50 ? `${d.data.ticker}` : ''
				if (width <= 50 || height <= 50) {
					tool.style("left", d.pageX + 10 + "px")
					tool.style("top", d.pageY - 10 + "px")
					tool.style("display", "inline-block");
					tool.html(cls + '<br>' + val_cur);
				}
			}).on("mouseout", function (d) {
				tool.style("display", "none");
			});

		const fontSize = 12;

		// add text to rects
		nodes.append('text')
			.text((d) => {
				const width = d.x1 - d.x0
				const height = d.y1 - d.y0
				return width > 50 && height > 50 ? `${d.data.ticker}` : ''
			})
			.attr('data-width', (d) => d.x1 - d.x0)
			.attr('font-size', `${fontSize + 4}px`)
			.attr('x', (d) => (d.x1 - d.x0) / 2)
			.attr('y', (d) => ((d.y1 - d.y0) / 2) - 7)
			.attr('class', (d) => d.data.ticker)
			.style('text-anchor', 'middle')
			.style('fill', 'white')
			.on("click", function () {
				const stockName = this.className.baseVal;
				navigate(`/stock/${stockName}`);
			})

		nodes.append('text')
			.text((d) => {
				const width = d.x1 - d.x0
				const height = d.y1 - d.y0
				const num = d.data[indicatorOption]
				const newNum = convertToInternationalCurrencySystem(num)
				return width > 50 && height > 50 ? newNum : ''
			})
			.attr('data-width', (d) => d.x1 - d.x0)
			.attr('font-size', `${fontSize}px`)
			.attr('x', (d) => (d.x1 - d.x0) / 2)
			.attr('y', (d) => ((d.y1 - d.y0) / 2) + 7)
			.attr('class', (d) => d.data.ticker)
			.style('text-anchor', 'middle')
			.style('fill', 'white')
			.on("click", function () {
				const stockName = this.className.baseVal;
				navigate(`/stock/${stockName}`);
			});


		if (industryOption === 'all_top_5') {
			// Add title for the 3 groups
			svg.selectAll("titles")
				.data(root.descendants().filter(function (d) { return d.depth === 1 }))
				.enter()
				.append("text")
				.attr("x", function (d) { return d.x0 })
				.attr("y", function (d) { return d.y0 + 12 })
				.text(function (d) { return d.data.name })
				.attr("font-size", "15px")
				.attr("fill", "black")
		}


		// Add title for the 3 groups
		svg.append("text")
			.attr("x", (width / 2) - 100)
			.attr("y", 14)    // +20 to adjust position (lower)
			.text("Stock Tree Graph")
			.attr("font-size", "19px")
			.attr("fill", "black")
	}

	useEffect(() => {
		renderTreemap();
	}, [data, indicatorOption, colorOption, industryOptions, industryColorObject]);

	return (
		<div>
			<div className='tooltip' ref={tooltip}></div>
			<svg ref={svgRef} />
			{/* <svg ref={legendRef} /> */}
		</div>
	);
}