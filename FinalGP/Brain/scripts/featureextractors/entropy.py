import tensorflow as tf
import numpy as np
import skimage.measure as ski
from skimage import color
from skimage import io


def entropy(image):
    image = tf.convert_to_tensor(np.asarray(image))
    image = color.rgb2gray(image)
    e = ski.shannon_entropy(image)
    return e
