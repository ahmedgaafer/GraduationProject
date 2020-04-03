from tensorflow.keras.preprocessing.image import load_img
import glob


def read_images(path):
    try:
        patterns = ("*.jpg", "*.jpeg")
        images = []
        for pattern in patterns:
            for img in glob.glob(f"{path}/{pattern}"):
                images.append(load_img(img))
        return images
    except:
        print("Error while reading images")
