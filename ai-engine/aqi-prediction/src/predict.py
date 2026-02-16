import tensorflow as tf
import numpy as np

def predict_aqi(lat, lon, time, historical_data):
    model = tf.keras.models.load_model('../models/aqi_model.h5')
    # Simulate fetching recent data based on lat, lon, time
    recent_data = historical_data[-10:]  # Last 10 timesteps
    X = np.array([recent_data]).reshape(1, 10, 1)
    prediction = model.predict(X)[0][0]
    return float(prediction)  # Return unscaled value later in API