import './App.css';
import TreeMap from './components/TreeMap';
import GraphChart from './components/GraphChart';
import UiSelect from './components/UiSelect'
import Header from './components/Header'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useState } from 'react';


const tempData = {
  name: 'Stock Data',
  "children": [
    {
      name: 'communication',
      children: [
        {
          'ticker': 'twtr',
          name: 'twtr',
          'close_price': 55,
          day_return: 55,
          move: 'gain',
          'p/e': 2.2,
          'eps': 5,
          '52_week_high': 70,
          '52_week_low': 30,
          'perf_over_year': .35,
          'mar_cap': '440',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'communication'
        },
        {
          'ticker': 'goog',
          name: 'goog',
          'close_price': 2700,
          day_return: 2700,
          move: 'gain',
          'p/e': 1.1,
          'eps': 3,
          '52_week_high': 2900,
          '52_week_low': 1700,
          'perf_over_year': .3,
          'mar_cap': '990',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'communication'
        },
        {
          'ticker': 'fb',
          name: 'fb',
          'close_price': 312,
          day_return: 312,
          move: 'gain',
          'p/e': 1.5,
          'eps': 3,
          '52_week_high': 290,
          '52_week_low': 370,
          'perf_over_year': .15,
          'mar_cap': '950',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'communication'
        },
      ]
    },
    {
      name: 'technology',
      children: [
        {
          'ticker': 'msft',
          name: 'msft',
          'close_price': 330,
          day_return: 330,
          move: 'gain',
          'p/e': 0.98,
          'eps': 4,
          '52_week_high': 312,
          '52_week_low': 200,
          'perf_over_year': .4,
          'mar_cap': '1100',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'technology'
        },
        {
          'ticker': 'amzn',
          name: 'amzn',
          'close_price': 3200,
          day_return: 3200,
          move: 'gain',
          'p/e': 1.98,
          'eps': 4,
          '52_week_high': 3700,
          '52_week_low': 3100,
          'perf_over_year': .15,
          'mar_cap': '940',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'technology'
        },
        {
          'ticker': 'APPL',
          name: 'APPL',
          'close_price': 150,
          day_return: 150,
          move: 'loss',
          'p/e': 1.32,
          'eps': 8,
          '52_week_high': 164,
          '52_week_low': 132,
          'perf_over_year': .1,
          'mar_cap': '1041',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'technology'
        }
      ]
    },
    {
      name: 'automobile',
      children: [
        {
          'ticker': 'GM',
          name: 'GM',
          'close_price': 1500,
          day_return: 1500,
          move: 'loss',
          'p/e': 1.32,
          'eps': 8,
          '52_week_high': 164,
          '52_week_low': 132,
          'perf_over_year': .1,
          'mar_cap': '1041',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'automobile'
        }
      ]
    }
  ]
}

const timelineOptions = [
  {
    id: '0',
    display: '1 Day Performace ',
    value: '1_day_performance'
  },
  {
    id: '1',
    display: '1 Year Performance',
    value: '1_year_performance'
  }
];
const industryOptions = [
  {
    id: '0',
    display: 'All',
    value: 'all'
  },
  {
    id: '1',
    display: 'Technology',
    value: 'technology'
  },
  {
    id: '2',
    display: 'Communication',
    value: 'communication'
  },
  {
    id: '3',
    display: 'Automobile',
    value: 'automobile'
  },
  // {
  //   id: '4',
  //   display: 'Finance',
  //   value: 'finance'
  // },
  // {
  //   id: '5',
  //   display: 'Healthcare',
  //   value: 'healthcare'
  // }
];
const indicatorOptions = [
  {
    id: '0',
    display: 'Day Return',
    value: 'day_return'
  },
  {
    id: '1',
    display: 'P/E',
    value: 'p/e'
  }
];

function App() {
  // const { data } = useFetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json')
  const [data, setData] = useState(tempData)
  const [timeline, setTimeline] = useState('value')
  const [industry, setIndustry] = useState('value')
  const [indicator, setIndicator] = useState('day_return')

  // const data = tempData;

  const onSetIndustry = (newIndustry) => {
    setIndustry(newIndustry)
    // console.log(newIndustry)
    if (newIndustry === 'all') {
      setData({...tempData})
    } else {
      const newData = tempData.children.filter((d) => (d.name === newIndustry))
      // debugger
      setData({
        name: 'Stock Data',
        children: newData
      })
    }
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="App">
            <div className='select-container'>
              <UiSelect label={'Timeline'} selectedValue={timeline} setSelectedValue={setTimeline} selectOptions={timelineOptions} />
              <UiSelect label={'Industry'} selectedValue={industry} setSelectedValue={onSetIndustry} selectOptions={industryOptions} />
              <UiSelect label={'Indicators'} selectedValue={indicator} setSelectedValue={setIndicator} selectOptions={indicatorOptions} />
            </div>
            <div className='tree-container'>
              <TreeMap data={data} keyValue={indicator} height="800" width="1500" />
            </div>
          </div>
        }>
        </Route>
        <Route path="/stock/:id" element={
          <GraphChart data={data} />
        }>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
