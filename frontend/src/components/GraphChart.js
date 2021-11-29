import React from 'react';
import { useParams } from 'react-router-dom';

function GraphChart({ data }) {
  let { id } = useParams();
  const stockGroup = data.children.find((d) => {
    const val = d.children.find((a) => (a.name === id))
    return val;
  });
  const stockDetails = stockGroup.children.find((a) => (a.name === id));

  // console.log(stockDetails)

  return (
    <div>
      <div>{stockDetails.name}</div>
      <div>{stockDetails.value}</div>
      <div>{stockDetails.perf_over_year}</div>
      <div>{stockDetails.move}</div>
      <div>{stockDetails.industry}</div>
    </div>
  );
}

export default GraphChart;