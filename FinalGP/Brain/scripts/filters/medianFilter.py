import tensorflow as tf
import tensorflow_addons as tfa
import numpy as np
from tensorflow.keras.preprocessing.image import array_to_img


def median_filter(image):
    """Convert image to tensor apply filter then convert it back to image"""
    image = tf.convert_to_tensor(np.array(image))
    image = tfa.image.median_filter2d(
        image,
        filter_shape=(5, 5),
        padding='REFLECT',
        constant_values=0,
        name=None
    )
    image = array_to_img(image)
    return image
