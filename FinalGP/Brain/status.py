from __future__ import absolute_import, division, print_function, unicode_literals
import tensorflow as tf
import tensorflow_hub as hub


def status():
    print("TensorFlow Version: ", tf.__version__)
    print("Eager mode: ", tf.executing_eagerly())
    print("Hub Version: ", hub.__version__)
    print("GPU is", "available" if tf.config.experimental.list_physical_devices("GPU") else "NOT AVAILABLE")