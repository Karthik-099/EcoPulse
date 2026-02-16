from transformers import BertForSequenceClassification, Trainer, TrainingArguments
from preprocess import load_and_preprocess
import torch

class Dataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

def train_model():
    encodings, labels = load_and_preprocess('../data/posts_text.csv')
    dataset = Dataset(encodings, labels)
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
    training_args = TrainingArguments(
        output_dir='../models/sentiment_model',
        num_train_epochs=3,
        per_device_train_batch_size=8,
        save_steps=500,
        save_total_limit=2
    )
    trainer = Trainer(model=model, args=training_args, train_dataset=dataset)
    trainer.train()
    model.save_pretrained('../models/sentiment_model')

if __name__ == "__main__":
    train_model()