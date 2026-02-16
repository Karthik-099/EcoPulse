from transformers import BertForSequenceClassification, BertTokenizer

def analyze_sentiment(text):
    model = BertForSequenceClassification.from_pretrained('../models/sentiment_model')
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=128)
    outputs = model(**inputs)
    prediction = outputs.logits.argmax().item()
    return {0: 'negative', 1: 'neutral', 2: 'positive'}[prediction]