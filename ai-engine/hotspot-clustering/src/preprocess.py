import pandas as pd

def load_and_preprocess(data_path):
    df = pd.read_csv(data_path)  # Expected columns: lat, lon, aqi
    df.dropna(subset=['lat', 'lon', 'aqi'], inplace=True)
    return df[['lat', 'lon', 'aqi']].values