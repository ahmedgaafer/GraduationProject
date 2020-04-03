from sklearn.svm import SVC # "Support vector classifier"
import csv
import pandas as pd
import joblib
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle
"""


# Saving the model
joblib.dump(svclassifier,'saved_model_pkl.pkl')

print('Model saved with accuracy {}'.format(accuracy_score(y_test,y_pred))) """
test_row = [27.4722088159588,0.318495489651459,0.0465149391983121,0.995530352044037]
df = pd.DataFrame([test_row], columns = ['contrast','homo', 'energy', 'correlation']) 


svc_from_file = joblib.load('saved_model_pkl.pkl')
p=svc_from_file.predict(df)
print(p)


