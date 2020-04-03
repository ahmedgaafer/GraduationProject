from .filters.grayScale import to_grayScale2D
from .filters.medianFilter import median_filter
from .transformers.resize import resize
from .filters.contrast import change_contrast


def pre_process(images):

    for i in range(len(images)):
        images[i] = resize(images[i])  #  DEFAULT 300 * 300
        images[i] = to_grayScale2D(images[i])
        images[i] = median_filter(images[i])
        images[i] = change_contrast(images[i], 50)
    return images

