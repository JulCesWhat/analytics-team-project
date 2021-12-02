import requests
import csv
import time
from datetime import datetime
from bs4 import BeautifulSoup

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                         "Chrome/70.0.3538.77 Safari/537.36"}


def stock_stats_helper(ticker):

    head = ['Ticker', 'Date', 'Open', 'Close', 'Volume', 'EPS', '52_Week_High', '52_Week_Low', 'Market_Cap', '52_Week_Change',  'PE_Ratio', 'Load_date']
    measures = []

    print(ticker)
    date = datetime.today().strftime('%Y-%m-%d')

    url = f"https://finviz.com/quote.ashx?t={ticker}&ty=c&ta=1&p=d"
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.content, 'html.parser')

    tables = soup.findAll('div', {'class', 'fv-container'})
    try:
        table_row = tables[1].findAll('tr')

        day_open = table_row[13].findAll('td')[11].text
        close = table_row[14].findAll('td')[11].text

        market_cap = table_row[5].findAll('td')[1].text
        if market_cap[-1] == 'B':
            market_cap = market_cap[:-1]
            market_cap = float(market_cap)
            market_cap = market_cap * 1000000000
            market_cap = int(market_cap)
        elif market_cap[-1] == 'M':
            market_cap = market_cap[:-1]
            market_cap = float(market_cap)
            market_cap = market_cap * 1000000
            market_cap = int(market_cap)

        EPS = table_row[4].findAll('td')[5].text
        volume = table_row[15].findAll('td')[9].text.replace(',', "")

        year_range = table_row[9].findAll('td')[9].text
        year_range = year_range.split(' ', 2)
        year_high = year_range[2]
        year_low = year_range[0]

        year_change = table_row[8].findAll('td')[11].text.replace('%', "")
        PE_ratio = table_row[4].findAll('td')[3].text
    except IndexError:
        missing.append(ticker)
        return

    measures.extend([ticker, date, day_open, close, volume, EPS, year_high, year_low, market_cap, year_change, PE_ratio, date])

    w = csv.writer(open('current/' + ticker + '-' + date + '.csv', 'w', newline=""))
    w.writerow(head)
    w.writerow(measures)


def get_stock_stats(stocks):
    for ticker in stocks:
        stock_stats_helper(ticker)


stock_list = []
with open('nasdaq_screener_1636937668945.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    next(spamreader, None)
    for row in spamreader:
        stock_list.append(row[0])

if __name__ == "__main__":
    missing = []
    start = time.time()
    get_stock_stats(stock_list)
    end = time.time()
    print('Elapsed Time:', (end - start))
    print('missing', missing)


