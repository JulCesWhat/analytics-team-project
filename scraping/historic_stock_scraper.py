import pandas as pd
import csv
import time
from urllib.error import HTTPError
from datetime import datetime

tickers_list = []
with open('nasdaq_screener_1636937668945.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    next(spamreader, None)
    for row in spamreader:
        tickers_list.append(row[0])


def sample(ticker):
    print(ticker)
    try:
        # URL for 11/29
        df = pd.read_csv(f'https://query1.finance.yahoo.com/v7/finance/download/{ticker}?period1=1606698872&period2=1638234872&interval=1d&events=history&includeAdjustedClose=true')
    except HTTPError:
        time.sleep(120)
        sample(ticker)
        return

    df.pop('Adj Close')
    df.pop('High')
    df.pop('Low')

    df.insert(0, 'Ticker', ticker)
    df['EPS'] = 'N/A'
    df['52_Week_High'] = 'N/A'
    df['52_Week_Low'] = 'N/A'
    df['Market_Cap'] = 'N/A'
    df['52_Week_Change'] = 'N/A'
    df['PE_Ratio'] = 'N/A'
    df['Load_Date'] = datetime.today().strftime('%Y-%m-%d')

    df.to_csv('historic/' + ticker + '_historic.csv', index=False)


if __name__ == "__main__":
    start = time.time()
    for ticker in tickers_list:
        sample(ticker)
    end = time.time()
    print('Elapsed Time:', (end - start))


