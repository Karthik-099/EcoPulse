import pandas as pd
from transformers import BertTokenizer
import nltk
nltk.download('stopwords')

def load_and_preprocess(data_path):
    df = pd.read_csv(data_path)  # Expected columns: text, sentiment (pos/neg/neu)
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    encodings = tokenizer(df['text'].tolist(), truncation=True, padding=True, max_length=128)
    labels = df['sentiment'].map({'pos': 2, 'neg': 0, 'neu': 1}).values
    return encodings, labels