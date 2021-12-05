import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import { useParams } from 'react-router-dom';

const URL = `${process.env.REACT_APP_API_BASE_URL}/dev/history?ticker=`

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
    }, [id])

    const stock = stocks.find((s) => (s.ticker === id))

    return (
        <>
            {
                loading ? <div className='loading-container'>Loading...</div> : (
                    <div className="App line-chart-container">
                        {stock && <div className='table-container'>
                            <h3>{stock?.name}</h3>
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
                                        <td>{stock?.sentiment_score}</td>
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

// 52_week_change: 6.95
// 52_week_change_score: -0.9942393149
// close: 3389.79
// date: "2021-12-01"
// eps: 51.14
// eps_score: 3.317790296
// market_cap: "1728250000000"
// name: "Amazon.com Inc. "
// open: 3437.36
// pe_ratio: 67.34
// pe_ratio_score: -3.4842249874
// sector: "Consumer Services"
// sentiment_flag: 1
// sentiment_score: 0.152105
// ticker: "AMZN"
// volume: 3955629