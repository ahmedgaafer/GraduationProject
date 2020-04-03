from PIL import Image


def write_images(images, path, prefix=""):
    try:
        index = 1
        for img in images:
            img.save(path+f'/{prefix}{index}.jpeg')
            index += 1
    except:
        print('Error while writing images')

