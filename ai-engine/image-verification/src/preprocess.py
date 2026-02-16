from PIL import Image
import os
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array, load_img

def load_and_preprocess(data_dir):
    X, y = [], []
    for label, folder in [('authentic', 1), ('ai-generated', 0)]:
        path = os.path.join(data_dir, label)
        for img_file in os.listdir(path):
            img = load_img(os.path.join(path, img_file), target_size=(224, 224))
            img_array = img_to_array(img) / 255.0
            X.append(img_array)
            y.append(folder)
    return np.array(X), np.array(y)