from .featureextractors.contrast import contrast
from .featureextractors.entropy import entropy
from .featureextractors.kurt import Kurtosis
from .featureextractors.mean import mean
from .featureextractors.sd import standard_deviation
from .featureextractors.skew import skewness
from .featureextractors.energy import energy


def extract_data(images, clas=None):
    data = []
    for image in images:
        v = []
        v.append(mean(image))
        v.append(standard_deviation(image))
        v.append(entropy(image))
        v.append(skewness(image))
        v.append(Kurtosis(image))
        v.append(energy(image))
        v.append(contrast(image))
        #v.append(clas)
        data.append(v)

    return data

