#from my_imports import *
import numpy as np
from skimage.feature import local_binary_pattern, greycomatrix, greycoprops

def GLCM(img_arr):
    feat_glcm = []
    img_arr = np.array(img_arr)
    gCoMat = greycomatrix(img_arr, [2], [0],256,symmetric=True, normed=True)
    contrast = greycoprops(gCoMat, prop='contrast')
    #dissimilarity = greycoprops(gCoMat, prop='dissimilarity')
    homogeneity = greycoprops(gCoMat, prop='homogeneity')    
    energy = greycoprops(gCoMat, prop='energy')
    correlation = greycoprops(gCoMat, prop='correlation')    
    return [contrast[0][0],homogeneity[0][0],energy[0][0],correlation[0][0]]
    
