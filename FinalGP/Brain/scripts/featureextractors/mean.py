import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import array_to_img


def mean(image):
    image = np.asarray(image)
    return np.float(np.mean(image))
