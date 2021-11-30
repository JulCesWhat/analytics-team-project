import './App.css';
import TreeMap from './components/TreeMap';
// import GraphChart from './components/GraphChart';
import UiSelect from './components/UiSelect'
import Header from './components/Header'
import IndividualStock from './components/IndividualStock'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

const URL = 'https://zhji3ynjle.execute-api.us-east-2.amazonaws.com/dev/current'

const indicatorOptions = [
  {
    id: '0',
    display: 'Sentiment Score',
    value: 'score'
  },
  {
    id: '1',
    display: '52 Week Change',
    value: '52_week_change'
  },
  {
    id: '2',
    display: '52 Week High',
    value: '52_week_high'
  },
  {
    id: '3',
    display: '52 Week Low',
    value: '52_week_low'
  },
  {
    id: '4',
    display: 'EPS',
    value: 'eps'
  },
  {
    id: '5',
    display: 'PE Ratio',
    value: 'pe_ratio'
  },
  {
    id: '6',
    display: 'Market Cap',
    value: 'market_cap'
  },
  {
    id: '7',
    display: 'Volume',
    value: 'volume'
  }
];

function App() {
  const [orgDataArr, setOrgDataArr] = useState([])
  const [orgData, setOrgData] = useState(null)
  const [data, setData] = useState(null)
  const [industry, setIndustry] = useState()
  const [industryOptions, setIndustryOptions] = useState([])
  const [indicator, setIndicator] = useState('score')
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    (async () => {
      try {
        const res = await fetch(URL);
        if (res.ok) {
          const json = await res.json();

          const cleanData = json.filter((d) => (isNaN(d.sector))).filter((d) => (d.sector !== null))
            .map((s) => ({...s, market_cap: parseInt(s.market_cap, 10)}))
          const foundIndustries = [...new Set(cleanData.map((d) => (d.sector)))]
          const newIndustries = foundIndustries.map((ind, i) => ({
            id: (i + 1).toString(),
            display: ind,
            value: ind.toLowerCase().replace(' ', '_')
          }))
          const allNewIndustries = [{ id: '0', display: 'All', value: 'all' }, ...newIndustries]
          setIndustry(allNewIndustries[0].value)
          setIndustryOptions(allNewIndustries)
          // console.log(allNewIndustries)

          const capi = {
            name: 'Stock Data',
            children: newIndustries.map((ind) => {
              return {
                name: ind.display,
                name_key: ind.value,
                children: cleanData.filter((j) => (j.sector === ind.display)).map((j) => ({ ...j, score: j.score.toFixed(2) }))
              }
            })
          }
          setOrgDataArr(cleanData)
          setOrgData(capi)
          setData(capi)
          // console.log(capi)

          // setData(json);
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


  const onSetIndustry = (newIndustry) => {
    setIndustry(newIndustry)
    if (newIndustry === 'all') {
      setData({ ...orgData })
    } else {
      const newData = orgData.children.filter((d) => (d.name_key === newIndustry))
      setData({
        name: 'Stock Data',
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
                  </div>
                  <div className='tree-container'>
                    <TreeMap data={data} keyValue={indicator} height="900" width="1600" />
                  </div>
                </div>
              )
          }>
          </Route>
          <Route path="/:id" element={
            <IndividualStock stocks={orgDataArr} />
          }>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
