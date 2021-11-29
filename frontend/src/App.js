import './App.css';
import TreeMap from './components/TreeMap';
// import GraphChart from './components/GraphChart';
import UiSelect from './components/UiSelect'
import Header from './components/Header'
// import useFetch from './hooks/useFetch'
import LineChart from './components/LineChart'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useState } from 'react';

// const URL_1 = 'https://qksgt4tu9j.execute-api.us-east-2.amazonaws.com/dev/current'
// const URL_2 = 'https://zhji3ynjle.execute-api.us-east-2.amazonaws.com/Stage/history?ticker=ABNB'

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

const tempData_2 = [
  {
    "ticker": "ABNB",
    "date": "2020-12-10",
    "close": 144.710007
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-11",
    "close": 139.25
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-14",
    "close": 130
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-15",
    "close": 124.800003
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-16",
    "close": 137.990005
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-17",
    "close": 147.050003
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-18",
    "close": 157.300003
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-21",
    "close": 163.020004
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-22",
    "close": 163.190002
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-23",
    "close": 158.009995
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-24",
    "close": 154.839996
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-28",
    "close": 149
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-29",
    "close": 150
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-30",
    "close": 148.429993
  },
  {
    "ticker": "ABNB",
    "date": "2020-12-31",
    "close": 146.800003
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-04",
    "close": 139.149994
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-05",
    "close": 148.300003
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-06",
    "close": 142.770004
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-07",
    "close": 151.270004
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-08",
    "close": 149.770004
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-11",
    "close": 148.130005
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-12",
    "close": 160.800003
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-13",
    "close": 169.990005
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-14",
    "close": 180.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-15",
    "close": 169.270004
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-19",
    "close": 173.690002
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-20",
    "close": 161.830002
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-21",
    "close": 180.399994
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-22",
    "close": 181.869995
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-25",
    "close": 177.529999
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-26",
    "close": 192.740005
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-27",
    "close": 201.25
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-28",
    "close": 187.369995
  },
  {
    "ticker": "ABNB",
    "date": "2021-01-29",
    "close": 183.630005
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-01",
    "close": 180.440002
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-02",
    "close": 179.169998
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-03",
    "close": 185.720001
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-04",
    "close": 195.800003
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-05",
    "close": 195.309998
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-08",
    "close": 200.429993
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-09",
    "close": 199.880005
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-10",
    "close": 211.660004
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-11",
    "close": 216.839996
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-12",
    "close": 212.679993
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-16",
    "close": 209.860001
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-17",
    "close": 201.960007
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-18",
    "close": 198.039993
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-19",
    "close": 201.070007
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-22",
    "close": 195.339996
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-23",
    "close": 187.589996
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-24",
    "close": 200.199997
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-25",
    "close": 182.059998
  },
  {
    "ticker": "ABNB",
    "date": "2021-02-26",
    "close": 206.350006
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-01",
    "close": 196.419998
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-02",
    "close": 189.899994
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-03",
    "close": 180.399994
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-04",
    "close": 180.229996
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-05",
    "close": 179.809998
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-08",
    "close": 180.809998
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-09",
    "close": 183.110001
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-10",
    "close": 183.789993
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-11",
    "close": 197.869995
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-12",
    "close": 206.740005
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-15",
    "close": 209.990005
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-16",
    "close": 200.009995
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-17",
    "close": 201.360001
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-18",
    "close": 191.449997
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-19",
    "close": 194.389999
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-22",
    "close": 195
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-23",
    "close": 187.139999
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-24",
    "close": 178.850006
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-25",
    "close": 176.160004
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-26",
    "close": 174.399994
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-29",
    "close": 182.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-30",
    "close": 183.100006
  },
  {
    "ticker": "ABNB",
    "date": "2021-03-31",
    "close": 187.940002
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-01",
    "close": 188.240005
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-05",
    "close": 186.690002
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-06",
    "close": 190.029999
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-07",
    "close": 179.940002
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-08",
    "close": 180.179993
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-09",
    "close": 179.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-12",
    "close": 176.490005
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-13",
    "close": 177.949997
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-14",
    "close": 176.429993
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-15",
    "close": 175.350006
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-16",
    "close": 178.690002
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-19",
    "close": 174.580002
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-20",
    "close": 169.570007
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-21",
    "close": 167.070007
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-22",
    "close": 170.710007
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-23",
    "close": 174.25
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-26",
    "close": 174.880005
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-27",
    "close": 177.940002
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-28",
    "close": 180
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-29",
    "close": 177.679993
  },
  {
    "ticker": "ABNB",
    "date": "2021-04-30",
    "close": 172.710007
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-03",
    "close": 168.110001
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-04",
    "close": 168.899994
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-05",
    "close": 162.330002
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-06",
    "close": 153.639999
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-07",
    "close": 151.210007
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-10",
    "close": 146.729996
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-11",
    "close": 142.729996
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-12",
    "close": 140.25
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-13",
    "close": 135.75
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-14",
    "close": 141.199997
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-17",
    "close": 132.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-18",
    "close": 135.020004
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-19",
    "close": 138.190002
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-20",
    "close": 136.199997
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-21",
    "close": 134.710007
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-24",
    "close": 135.910004
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-25",
    "close": 133.990005
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-26",
    "close": 134.75
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-27",
    "close": 143.169998
  },
  {
    "ticker": "ABNB",
    "date": "2021-05-28",
    "close": 140.399994
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-01",
    "close": 144.309998
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-02",
    "close": 151
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-03",
    "close": 144.190002
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-04",
    "close": 150.729996
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-07",
    "close": 148.970001
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-08",
    "close": 147.009995
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-09",
    "close": 144.850006
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-10",
    "close": 146.119995
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-11",
    "close": 148.440002
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-14",
    "close": 149.210007
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-15",
    "close": 151.779999
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-16",
    "close": 149.149994
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-17",
    "close": 150.699997
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-18",
    "close": 152.520004
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-21",
    "close": 149.699997
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-22",
    "close": 149.679993
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-23",
    "close": 151.580002
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-24",
    "close": 150.729996
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-25",
    "close": 149.669998
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-28",
    "close": 149.940002
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-29",
    "close": 146.080002
  },
  {
    "ticker": "ABNB",
    "date": "2021-06-30",
    "close": 153.139999
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-01",
    "close": 153.080002
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-02",
    "close": 150.229996
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-06",
    "close": 148.369995
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-07",
    "close": 143.720001
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-08",
    "close": 142.529999
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-09",
    "close": 149.639999
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-12",
    "close": 146.690002
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-13",
    "close": 143.410004
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-14",
    "close": 139.089996
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-15",
    "close": 137.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-16",
    "close": 134.309998
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-19",
    "close": 131.880005
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-20",
    "close": 136.089996
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-21",
    "close": 139.25
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-22",
    "close": 139.470001
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-23",
    "close": 138.729996
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-26",
    "close": 142
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-27",
    "close": 141.580002
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-28",
    "close": 143.300003
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-29",
    "close": 143.470001
  },
  {
    "ticker": "ABNB",
    "date": "2021-07-30",
    "close": 144.009995
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-02",
    "close": 145.490005
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-03",
    "close": 145.649994
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-04",
    "close": 147.399994
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-05",
    "close": 150.320007
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-06",
    "close": 149.990005
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-09",
    "close": 149.440002
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-10",
    "close": 147.949997
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-11",
    "close": 148.160004
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-12",
    "close": 151.149994
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-13",
    "close": 152.759995
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-16",
    "close": 148.570007
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-17",
    "close": 143.899994
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-18",
    "close": 146.740005
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-19",
    "close": 142.649994
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-20",
    "close": 143.699997
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-23",
    "close": 146.789993
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-24",
    "close": 161.419998
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-25",
    "close": 160.350006
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-26",
    "close": 152.729996
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-27",
    "close": 154.179993
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-30",
    "close": 156.020004
  },
  {
    "ticker": "ABNB",
    "date": "2021-08-31",
    "close": 154.990005
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-01",
    "close": 156.589996
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-02",
    "close": 157.199997
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-03",
    "close": 158
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-07",
    "close": 165
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-08",
    "close": 163.929993
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-09",
    "close": 166
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-10",
    "close": 165.199997
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-13",
    "close": 160.320007
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-14",
    "close": 163.300003
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-15",
    "close": 166.369995
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-16",
    "close": 168.149994
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-17",
    "close": 166.589996
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-20",
    "close": 161.639999
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-21",
    "close": 169.289993
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-22",
    "close": 169.960007
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-23",
    "close": 175.130005
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-24",
    "close": 175.880005
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-27",
    "close": 174.259995
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-28",
    "close": 168.580002
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-29",
    "close": 168.070007
  },
  {
    "ticker": "ABNB",
    "date": "2021-09-30",
    "close": 167.75
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-01",
    "close": 173.009995
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-04",
    "close": 164.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-05",
    "close": 164.740005
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-06",
    "close": 167.25
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-07",
    "close": 169.600006
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-08",
    "close": 169.970001
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-11",
    "close": 166.669998
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-12",
    "close": 172.75
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-13",
    "close": 173.580002
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-14",
    "close": 170.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-15",
    "close": 169.179993
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-18",
    "close": 172.320007
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-19",
    "close": 170.740005
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-20",
    "close": 169.759995
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-21",
    "close": 170.5
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-22",
    "close": 166.639999
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-25",
    "close": 169.240005
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-26",
    "close": 171.139999
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-27",
    "close": 169.100006
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-28",
    "close": 171.699997
  },
  {
    "ticker": "ABNB",
    "date": "2021-10-29",
    "close": 170.660004
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-01",
    "close": 174.600006
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-02",
    "close": 172.869995
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-03",
    "close": 172.869995
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-04",
    "close": 178.449997
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-05",
    "close": 201.619995
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-08",
    "close": 200.320007
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-09",
    "close": 194.679993
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-10",
    "close": 192.220001
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-11",
    "close": 191.610001
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-12",
    "close": 206.539993
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-15",
    "close": 207.210007
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-16",
    "close": 207.039993
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-17",
    "close": 199.110001
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-18",
    "close": 204.330002
  },
  {
    "ticker": "ABNB",
    "date": "2021-11-19",
    "close": 196.419998
  }
]

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
  const [data, setData] = useState(tempData)
  const [industry, setIndustry] = useState('value')
  const [indicator, setIndicator] = useState('day_return')


  // const { data_1, error_1, loading_1 } = useFetch(URL_1)
  // const { data_2, error_2, loading_2 } = useFetch(URL_2)

  // const data = tempData;

  const onSetIndustry = (newIndustry) => {
    setIndustry(newIndustry)
    // console.log(newIndustry)
    if (newIndustry === 'all') {
      setData({ ...tempData })
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
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="App">
              <div className='select-container'>
                <UiSelect label={'Industry'} selectedValue={industry} setSelectedValue={onSetIndustry} selectOptions={industryOptions} />
                <UiSelect label={'Indicators'} selectedValue={indicator} setSelectedValue={setIndicator} selectOptions={indicatorOptions} />
              </div>
              <div className='tree-container'>
                <TreeMap data={data} keyValue={indicator} height="800" width="1500" />
              </div>
            </div>
          }>
          </Route>
          <Route path="/:id" element={
            <div className="App">
              <LineChart data={tempData_2} n_height="600" n_width="1000" />
            </div>
          }>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
