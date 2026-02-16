from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import io
import numpy as np

def verify_image(image_bytes):
    model = load_model('../models/image_classifier.h5')
    img = Image.open(io.BytesIO(image_bytes)).resize((224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = model.predict(img_array)[0][0]
    return bool(prediction > 0.5)  # True if authentic