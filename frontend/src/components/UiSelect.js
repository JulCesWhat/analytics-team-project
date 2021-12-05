import React, { useState, useEffect } from 'react';

const info_content = {
    'market_cap': "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.",
    'volume': "Trading volume is a measure of how much a given financial asset has traded in a period of time. For stocks, volume is measured in the number of shares traded and, for futures and options, it is based on how many contracts have changed hands.",
    'sentiment_score': "Sentiment analysis (also known as opinion mining or emotion AI) is the use of natural language processing, text analysis, computational linguistics, and biometrics to systematically identify, extract, quantify, and study affective states and subjective information.",
    '52_week_change': '',
    'eps_score': "The Earnings Per Share Rating measures a company's earnings growth over the last five years. Then, the percentage change in the last two quarters' earnings vs. the same quarters a year earlier is combined and averaged with the five-year figure",
    'pe_ratio_score': "The price-earnings ratio, also known as P/E ratio, P/E, or PER, is the ratio of a company's share price to the company's earnings per share."
}

export default function UiSelect({ label, selectedValue, setSelectedValue, selectOptions }) {
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState('')

    const handleOnchange = (event) => {
        setSelectedValue(event.target.value)
    };

    useEffect(() => {
        const optionKey = Object.keys(info_content).find((info) => (info === selectedValue)) ?? ''
        if (optionKey.length) {
            setInfo(info_content[optionKey])
        }
        return () => {
        }
    }, [selectedValue])

    return (
        <div className='ui-select'>
            <span>
                <label htmlFor={'id_' + label}>{label + ':'}</label>
                {
                    !!info.length && (
                        <>
                            <div className={showInfo ? 'dropdown-tooltip show-tooltip' : 'dropdown-tooltip'}>{info}</div>
                            <i className="fa fa-info"
                                onMouseEnter={() => {
                                    setShowInfo(true)
                                }}
                                onMouseLeave={() => {
                                    setShowInfo(false)
                                }}></i>
                        </>
                    )
                }
            </span>
            <select id={'id_' + label} value={selectedValue} onChange={(event) => (handleOnchange(event))}>
                {
                    selectOptions.map((s) => (
                        <option key={s.id} value={s.value}>{s.display}</option>
                    ))
                }
            </select>
        </div>
    );
}