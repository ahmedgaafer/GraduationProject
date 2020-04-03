import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import array_to_img


def standard_deviation(image):
    image = tf.convert_to_tensor(np.asarray(image),dtype='float64')
    sd = tf.math.reduce_std(image, keepdims=True)
    return np.float(sd)
