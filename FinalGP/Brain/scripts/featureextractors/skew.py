from skimage import color
import numpy as np
from scipy.stats import skew


def skewness(image):
    im = color.rgb2gray(np.asarray(image))
    return skew(im.reshape(-1), axis=None)
