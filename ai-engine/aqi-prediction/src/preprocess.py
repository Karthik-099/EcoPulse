import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def load_and_preprocess(data_path):
    df = pd.read_csv(data_path)  # Expected columns: timestamp, lat, lon, aqi
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values('timestamp')
    df.fillna(method='ffill', inplace=True)  # Forward fill missing values
    scaler = MinMaxScaler()
    df[['aqi']] = scaler.fit_transform(df[['aqi']])
    return df, scaler

def create_sequences(data, seq_length=10):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)