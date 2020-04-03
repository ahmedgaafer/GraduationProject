from glob import glob
from .scripts.imageIO.readImages import read_images
from .scripts.imageIO.writeImages import write_images
from .scripts.preprocess import pre_process
from .scripts.extractVector import extract_data
from .scripts.fileIO.tocsv import save_to_csv
from .scripts.models.SVM import SVM
import joblib
import pandas as pd
from .utils import *
import os

def Predict_Brain(photo):
    img = pre_process([photo])
    vec = extract_data(img)
    df = pd.DataFrame([vec[0]], columns=['mean','standard_deviation','entropy','skewness','kurtosis','energy','contrast'])
    return df
