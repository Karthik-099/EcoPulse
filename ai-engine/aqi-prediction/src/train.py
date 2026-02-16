import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from preprocess import load_and_preprocess, create_sequences

def train_model():
    df, scaler = load_and_preprocess('../data/historical_aqi.csv')
    data = df['aqi'].values
    X, y = create_sequences(data)
    split = int(0.8 * len(X))
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]

    model = Sequential([
        LSTM(50, activation='relu', input_shape=(10, 1)),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X_train, y_train, epochs=20, validation_data=(X_test, y_test))
    model.save('../models/aqi_model.h5')
    return scaler

if __name__ == "__main__":
    train_model()