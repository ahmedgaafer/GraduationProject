from skimage import color
import numpy as np
from scipy.stats import kurtosis


def Kurtosis(image):
    im = color.rgb2gray(np.asarray(image))
    im = kurtosis(im, axis=None)
    return im
