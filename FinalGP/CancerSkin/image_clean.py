#from my_imports import *
from PIL import Image, ImageEnhance,ImageFilter
import numpy
import numpy as np
import cv2
def preprocessing(img):
    # GAY SCALE CONVERSION
    img = img.convert('L')
    
    # NOISE REMOVAL USING MEDIAN-FILTER ALGORITHM
    imag=img.filter(ImageFilter.MedianFilter(size=7))
   
    #Image Contrast Enhancment 
    enh_con = ImageEnhance.Contrast(imag)
    contrast = 1.5
    img = enh_con.enhance(contrast)
    arr = numpy.array(img)
    
    #img_arr=maxen(arr)
    #img_arr = otsu_seg(arr)
    return arr


def entp(x):
    temp = np.multiply(x, np.log(x))
    temp[np.isnan(temp)] = 0
    return temp

def maxen(img):
    H = cv2.calcHist([img],[0],None,[256],[0,256])
    H = H / np.sum(H)

    theta = np.zeros(256)
    Hf = np.zeros(256)
    Hb = np.zeros(256)

    for T in range(1,255):
        Hf[T] = - np.sum( entp(H[:T-1] / np.sum(H[1:T-1])) )
        Hb[T] = - np.sum( entp(H[T:] / np.sum(H[T:])) )
        theta[T] = Hf[T] + Hb[T]

    theta_max = np.argmax(theta)
    img_out = img > theta_max
    #plt.imshow(img_out, cmap = plt.get_cmap(name = 'gray'))
    #plt.show()
    img_arr= Image.fromarray(np.uint8(img_out))
   
    return img_arr

def hair_removal(img):
    grayScale = cv2.cvtColor( img, cv2.COLOR_RGB2GRAY )
    # Kernel for the morphological filtering
    kernel = cv2.getStructuringElement(1,(17,17))
    # Perform the blackHat filtering on the grayscale image to find the 
    # hair countours
    blackhat = cv2.morphologyEx(grayScale, cv2.MORPH_BLACKHAT, kernel)
    # intensify the hair countours in preparation for the inpainting 
    # algorithm
    ret,thresh2 = cv2.threshold(blackhat,10,255,cv2.THRESH_BINARY)
    # inpaint the original image depending on the mask
    dst = cv2.inpaint(img,thresh2,1,cv2.INPAINT_TELEA)
    return dst

def otsu_seg(img_arr):
    blur = cv2.GaussianBlur(img_arr,(5,5),0)
    ret3,th3 = cv2.threshold(blur,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    return th3
