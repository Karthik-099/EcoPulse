from sklearn.cluster import DBSCAN
import pickle
from preprocess import load_and_preprocess

def cluster_hotspots(data=None, train=False):
    if train:
        data = load_and_preprocess('../data/posts_data.csv')
        dbscan = DBSCAN(eps=0.1, min_samples=5)  # Adjust eps based on lat/lon scale
        labels = dbscan.fit_predict(data[:, :2])  # Cluster on lat, lon
        with open('../models/clustering_model.pkl', 'wb') as f:
            pickle.dump(dbscan, f)
        return labels
    else:
        with open('../models/clustering_model.pkl', 'rb') as f:
            dbscan = pickle.load(f)
        labels = dbscan.fit_predict(data[:, :2])
        return labels.tolist()