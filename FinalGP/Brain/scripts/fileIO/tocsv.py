import pandas as pd
import csv


def save_to_csv(data, colNames, filename, path="modals/"):
    with open(path+filename+".csv", 'w', newline='') as f:
        wr = csv.writer(f)
        wr.writerow(colNames)
        for row in data:
            wr.writerow(row)
