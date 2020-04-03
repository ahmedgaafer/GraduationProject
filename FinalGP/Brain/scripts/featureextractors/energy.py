import numpy as np
from skimage.feature import greycomatrix, greycoprops
from ..filters.grayScale import to_grayScale


def energy(image):
    img = np.array(to_grayScale(image))
    gCoMat = greycomatrix(img, [2], [0], 256, symmetric=True, normed=True)
    return greycoprops(gCoMat, prop="energy")[0][0]
