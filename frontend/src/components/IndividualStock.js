import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import { useParams } from 'react-router-dom';

const URL = 'https://zhji3ynjle.execute-api.us-east-2.amazonaws.com/dev/history?ticker='

export default function IndividualStock({ stocks }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    // const [stock, setStock] = useState(null)

    let { id } = useParams();

    useEffect(() => {
        // setStock(orgDataArr.find((s) => (s.ticker === id)))
        (async () => {
            try {
                const res = await fetch(URL + id);
                if (res.ok) {
                    const json = await res.json();
                    // console.log(json)
                    setData(json);
                } else {
                    throw res;
                }
            } catch (e) {
                // setError(e);
            } finally {
                setLoading(false);
            }
        })()

        return () => {
        }
    }, [])

    const stock = stocks.find((s) => (s.ticker === id))

    return (
        <>
            {
                loading ? <div className='loading-container'>Loading...</div> : (
                    <div className="App line-chart-container">
                        {stock && <div className='table-container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Volume</td>
                                        <td>{stock?.volume}</td>
                                    </tr>
                                    <tr>
                                        <td>Sentiment Score</td>
                                        <td>{stock?.score}</td>
                                    </tr>
                                    <tr>
                                        <td>PE Ratio</td>
                                        <td>{stock?.pe_ratio}</td>
                                    </tr>
                                    <tr>
                                        <td>52 Week Change</td>
                                        <td>{stock['52_week_change']}</td>
                                    </tr>
                                    <tr>
                                        <td>52 Week High</td>
                                        <td>{stock['52_week_high']}</td>
                                    </tr>
                                    <tr>
                                        <td>52 Week Low</td>
                                        <td>{stock['52_week_low']}</td>
                                    </tr>
                                    <tr>
                                        <td>Market Cap</td>
                                        <td>{stock['market_cap'].toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td>EPS</td>
                                        <td>{stock?.eps}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>}
                        <div className='linechart-container'>
                            <LineChart data={data} n_height="600" n_width="1000" />
                        </div>
                    </div>
                )
            }
        </>
    );
}

// 52_week_change: "23.21"
// 52_week_high: 27.97
// 52_week_low: 17.15
// close: 21.82
// date: "2021-11-29"
// eps: 0.83
// load_date: "2021-11-29"
// market_cap: "13600000000"
// open: 21.45
// pe_ratio: 26.32
// score: 0.038909
// sector: "Consumer Services"
// ticker: "NWSA"
// volume: 5126672