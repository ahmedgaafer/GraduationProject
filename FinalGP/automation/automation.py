# import the necessary packages
from skimage.measure import compare_ssim
import argparse
import os
import imutils
import cv2


def load_images_from_folder(folder):
    images = []

    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder, filename))
        images.append(img)

    return images


def automate(path, input_img):
    images = load_images_from_folder(path)
    dum = -1
    max_sim = -1
    for image in images:
        dum = how_similar(image, input_img)

        if dum > max_sim:
            max_sim = dum
    return max_sim


def how_similar(original, image_to_compare):
    imageA = original
    imageB = image_to_compare
    (H, W, k) = imageA.shape
    dim = (W, H)
    imageB = cv2.resize(imageB, dim)

    # convert the images to grayscale
    grayA = cv2.cvtColor(imageA, cv2.COLOR_BGR2GRAY)
    grayB = cv2.cvtColor(imageB, cv2.COLOR_BGR2GRAY)
    (score, diff) = compare_ssim(grayA, grayB, full=True)
    diff = (diff * 255).astype("uint8")
    return score


#img = cv2.imread('99.JPG')
#skin = automate('skin automation', img)
#Malaria = automate('Malaria automation', img)
#brain = automate('Brain automation', img)
#if skin > Malaria and skin > brain:
#    print("Skin Cancer")
    # call skin cancer model
#elif Malaria > skin and Malaria > brain:
#    print("Malaria")
    # call brain tumor
#else:
#    print("Brain Tumor")


