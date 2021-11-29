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


        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(newData, function (d) { return d.date; }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(newData, function (d) { return +d.close; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Add the line
        svg.append("path")
            .datum(newData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.close) })
            )

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 14)    // +20 to adjust position (lower)
            .text("Stock Name")
            .attr("font-size", "19px")
            .attr("fill", "grey")
    }

    useEffect(() => {
        const newData = data.map((d) => ({
            ...d,
            date: d3.timeParse("%Y-%m-%d")(d.date)
        }))
        renderLinechart(newData);
    }, [data]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};