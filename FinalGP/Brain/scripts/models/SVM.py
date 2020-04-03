from sklearn.svm import SVC # "Support vector classifier"
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import pickle, joblib


def SVM(path):

    filename="modals/SVM_BRAIN.pkl"
    data = pd.read_csv(path)
    print(data.shape)
    y = data['class']
    X = data.drop('class', axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.175, random_state=1)
    svclassifier = SVC(kernel='linear', random_state=1)
    svclassifier.fit(X_train, y_train)
    y_pred = svclassifier.predict(X_test)
    print(confusion_matrix(y_test,y_pred))
    print(classification_report(y_test,y_pred))
    print(f'Saving the model to: {filename}')
    joblib.dump(svclassifier, filename)
