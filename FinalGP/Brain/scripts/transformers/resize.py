import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import array_to_img
from tensorflow_core.python.keras.layers.image_preprocessing import ResizeMethod



def resize(image, w=300, h=300):

    image = tf.convert_to_tensor(np.asarray(image))
    image = tf.image.resize_with_pad(
        image,
        h,
        w,
        method=ResizeMethod.BILINEAR
    )
    image = array_to_img(image)
    return image
