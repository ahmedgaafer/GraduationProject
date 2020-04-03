import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import array_to_img


def to_grayScale(image):
    image = tf.convert_to_tensor(np.array(image))
    image = tf.image.rgb_to_grayscale(image)

    image = array_to_img(image)
    return image
def to_grayScale2D(image):
    image = tf.convert_to_tensor(np.array(image))
    image = tf.image.rgb_to_grayscale(image)
    image = tf.image.grayscale_to_rgb(image)
    image = array_to_img(image)
    return image

