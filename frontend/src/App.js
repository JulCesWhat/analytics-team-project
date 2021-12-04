import './App.css';
import TreeMap from './components/TreeMap';
// import GraphChart from './components/GraphChart';
import UiSelect from './components/UiSelect'
import Header from './components/Header'
import IndividualStock from './components/IndividualStock'

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

const URL = 'https://zhji3ynjle.execute-api.us-east-2.amazonaws.com/dev/current'

const indicatorOptions = [
	{
		id: '0',
		display: 'Market Cap',
		value: 'market_cap'
	},
	{
		id: '1',
		display: 'Volume',
		value: 'volume'
	}
];

const colorOptions = [
	{
		id: '0',
		display: 'Sentiment Score',
		value: 'sentiment_score'
	},
	{
		id: '1',
		display: '52 Week Change',
		value: '52_week_change'
	},
	{
		id: '2',
		display: 'EPS',
		value: 'eps_score'
	},
	{
		id: '3',
		display: 'PE Ratio',
		value: 'pe_ratio_score'
	},
];

function App() {
	const [orgDataArr, setOrgDataArr] = useState([])
	const [orgData, setOrgData] = useState(null)
	const [data, setData] = useState(null)
	const [industry, setIndustry] = useState('all_top_5')
	const [industryOptions, setIndustryOptions] = useState([])
	const [indicator, setIndicator] = useState('market_cap')
	const [color, setColor] = useState('sentiment_score')
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		(async () => {
			try {
				const res = await fetch(URL);
				if (res.ok) {
					const json = await res.json();

					const cleanData = json.filter((d) => (isNaN(d.sector)))
						.filter((d) => (d.sector !== (null || 'None')))
						.map((s) => ({
							...s,
							market_cap: parseInt(s.market_cap, 10)
						}))
					const foundIndustries = [...new Set(cleanData.map((d) => (d.sector)))]
					const newIndustries = foundIndustries.map((ind, i) => ({
						id: (i + 1).toString(),
						display: ind,
						value: ind.toLowerCase().replace(' ', '_')
					}))
					const allNewIndustries = [{ id: '0', display: 'All Top 5', value: 'all_top_5' }, ...newIndustries]
					setIndustryOptions(allNewIndustries)

					const capi = {
						name: 'Stock Data',
						children: newIndustries.map((ind) => {
							return {
								name: ind.display,
								name_key: ind.value,
								children: cleanData.filter((j) => (j.sector === ind.display))
									.map((j) => ({
										...j,
										eps_score: +j.eps_score.toFixed(2),
										pe_ratio_score: +j.pe_ratio_score.toFixed(2),
										sentiment_score: +j.sentiment_score.toFixed(2)
									}))
									.sort((a, b) => b[indicator] - a[indicator])
									.slice(0, 5)
							}
						})
					}
					setOrgDataArr(cleanData)
					setOrgData(capi)
					setData(capi)
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
	}, [indicator])


	const onSetIndustry = (newIndustry) => {
		setIndustry(newIndustry)
		if (newIndustry === 'all_top_5') {
			setData({ ...orgData })
		} else {
			const foundIndustry = industryOptions.find((d) => (d.value === newIndustry))
			const newData = orgDataArr.filter((j) => (j.sector === foundIndustry.display))
				.map((j) => ({
					...j,
					eps_score: j.eps_score.toFixed(2),
					pe_ratio_score: j.pe_ratio_score.toFixed(2),
					sentiment_score: j.sentiment_score.toFixed(2)
				}))
				.sort((a, b) => b[indicator] - a[indicator])
			setData({
				name: foundIndustry.display,
				children: newData
			})
		}
	}

	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={
						loading ? <div className='loading-container'>Loading...</div> :
							(
								<div className="App">
									<div className='select-container'>
										<UiSelect label={'Industry'} selectedValue={industry} setSelectedValue={onSetIndustry} selectOptions={industryOptions} />
										<UiSelect label={'Indicators'} selectedValue={indicator} setSelectedValue={setIndicator} selectOptions={indicatorOptions} />
										<UiSelect label={'Metrics'} selectedValue={color} setSelectedValue={setColor} selectOptions={colorOptions} />
									</div>
									<div className='tree-container'>
										<TreeMap data={data} industryOptions={industryOptions} industryOption={industry} indicatorOption={indicator} colorOption={color} height="900" width="1600" />
									</div>
								</div>
							)
					}>
					</Route>
					<Route path="/stock/:id" element={
						<IndividualStock stocks={orgDataArr} />
					}>
					</Route>
					<Route path='/index.html' element={
						<Navigate to="/" />
					}>
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
