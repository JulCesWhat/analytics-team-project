import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function LineChart({ data, n_width, n_height }) {
    const svgRef = useRef(null);

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = n_width - margin.left - margin.right,
        height = n_height - margin.top - margin.bottom;

    function renderLinechart(newData) {

        d3.select(svgRef.current)
            .selectAll('g').remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const bisectDate = d3.bisector(function (d) { return d.date; }).left;


        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(newData, function (d) { return d.date; }))
            .range([0, width])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d => d.toLocaleDateString()))

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(newData, function (d) { return +d.close; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y).tickFormat(d => {
                return d.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });
            }))

        // Add the line
        svg.append("path")
            .datum(newData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.close) })
            ).style('opacity', .4)


        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        focus.append("text")
            .attr("class", "tooltip-date")
            .attr("x", -20)
            .attr("y", 20);

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () { focus.style("display", null); })
            .on("mouseout", function () { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove(e) {
            var x0 = x.invert(d3.pointer(e)[0]),
                i = bisectDate(newData, x0, 1),
                d0 = newData[i - 1],
                d1 = newData[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
            focus.select(".tooltip-date").text(d.close.toFixed(2));
        }



        // Labels

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 30)
            .text("Timeline");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", -45)
            .attr("x", -(height / 2))
            .attr("transform", "rotate(-90)")
            .text("Stock Price");

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", (height / 2))
            .attr("text-anchor", "middle")
            .text(data[0].ticker)
            .attr("font-size", "120px")
            .attr("fill", "grey")
            .style("opacity", "0.2")
    }

    useEffect(() => {
        const newData = data.map((d) => ({
            ...d,
            date: d3.timeParse("%Y-%m-%d")(d.date),
        }))
        renderLinechart(newData);
    }, [data, n_width, n_height]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};