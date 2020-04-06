import cv2, os
import numpy as np
import csv
import glob
import pandas as pd
import pickle, joblib


def pre_extract(img):
    img = cv2.GaussianBlur(img, (5, 5), 2)
    im_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    ret, thresh = cv2.threshold(im_gray, 127, 255, 0)
    _,contours,a = cv2.findContours(thresh, 1, 2)
    for contour in contours:
        cv2.drawContours(im_gray, contour, -1, (0, 255, 0), 3)
    arr = []
    for i in range(5):

        try:
            arr.append(cv2.contourArea(contours[i]))
        # file.write(str(area))
        except:
            arr.append(0)

    df = pd.DataFrame([arr], columns=['area_0', 'area_1', 'area_2', 'area_3', 'area_4'])

    model_from_file = joblib.load('Malaria/malaria.pkl')
    p = model_from_file.predict(df)
    return p[0]


#img = cv2.imread('e80e6f07-2854-4e9c-841b-2da08b3db032.jpg')
#pre_extract(img)

