// import logo from './logo.svg';
import './App.css';
// import BarChart from './components/BarChart';
import TreeMap from './components/TreeMap';
// import useFetch from './hooks/useFetch';

const tempData = {
  name: 'Stock Data',
  "children": [
    {
      name: 'communication',
      children: [
        {
          'ticker': 'twtr',
          name: 'twtr',
          'close_price': '55',
          value: 55,
          move: 'gain',
          'p/e': '2.2',
          'eps': '5',
          '52_week_high': '70',
          '52_week_low': '30',
          'perf_over_year': '35%',
          'mar_cap': '440',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'communication'
        },
        {
          'ticker': 'goog',
          name: 'goog',
          'close_price': '2700',
          value: 2700,
          move: 'gain',
          'p/e': '1.1',
          'eps': '3',
          '52_week_high': '2900',
          '52_week_low': '1700',
          'perf_over_year': '30%',
          'mar_cap': '990',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'communication'
        },
        {
          'ticker': 'fb',
          name: 'fb',
          'close_price': '312',
          value: 312,
          move: 'gain',
          'p/e': '1.5',
          'eps': '3',
          '52_week_high': '290',
          '52_week_low': '370',
          'perf_over_year': '15%',
          'mar_cap': '950',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'communication'
        },
      ]
    }, {
      name: 'technology',
      children: [
        {
          'ticker': 'msft',
          name: 'msft',
          'close_price': '330',
          value: 330,
          move: 'gain',
          'p/e': '0.98',
          'eps': '4',
          '52_week_high': '312',
          '52_week_low': '200',
          'perf_over_year': '40%',
          'mar_cap': '1100',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'technology'
        },
        {
          'ticker': 'amzn',
          name: 'amzn',
          'close_price': '3200',
          value: 3200,
          move: 'gain',
          'p/e': '1.98',
          'eps': '4',
          '52_week_high': '3700',
          '52_week_low': '3100',
          'perf_over_year': '15%',
          'mar_cap': '940',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'technology'
        },
        {
          'ticker': 'APPL',
          name: 'APPL',
          'close_price': '150',
          value: 150,
          move: 'loss',
          'p/e': '1.32',
          'eps': '8',
          '52_week_high': '164',
          '52_week_low': '132',
          'perf_over_year': '10%',
          'mar_cap': '1041',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'technology'
        }
      ]
    },
    {
      name: 'Car',
      children: [
        {
          'ticker': 'GM',
          name: 'GM',
          'close_price': '1500',
          value: 1500,
          move: 'loss',
          'p/e': '1.32',
          'eps': '8',
          '52_week_high': '164',
          '52_week_low': '132',
          'perf_over_year': '10%',
          'mar_cap': '1041',
          'date': '10262021',
          'load_date': '10262021',
          'industry': 'Car'
        }
      ]
    }
  ]
}


function App() {
  // const { data } = useFetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json')

  const data = tempData;
  console.log(data);

  return (
    <div className="App">
      {/* <header className="App-header">
          <BarChart data={data} />
        </header> */}
      <TreeMap data={data} height="800" width="800" />
    </div>
  );
}

export default App;
