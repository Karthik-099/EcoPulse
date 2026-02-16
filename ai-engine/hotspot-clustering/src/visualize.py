import folium
import pandas as pd

def visualize_clusters(data_path, labels):
    df = pd.read_csv(data_path)
    df['cluster'] = labels
    m = folium.Map(location=[df['lat'].mean(), df['lon'].mean()], zoom_start=10)
    for _, row in df.iterrows():
        color = 'red' if row['cluster'] == -1 else 'blue'
        folium.CircleMarker([row['lat'], row['lon']], radius=5, color=color).add_to(m)
    m.save('clusters.html')

if __name__ == "__main__":
    labels = cluster_hotspots(train=True)
    visualize_clusters('../data/posts_data.csv', labels)