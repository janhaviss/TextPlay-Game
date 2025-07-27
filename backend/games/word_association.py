# from gensim.models import KeyedVectors
# import os
import gensim.downloader as api

print("Loading fasttext model... (this may take a few minutes)")
model = api.load('fasttext-wiki-news-subwords-300') 
print("model loaded")


def preprocess_word(word):
    word = word.lower()
    if word.endswith('s') and len(word) > 1:
        word = word[:-1]
    return word

def get_associated_words(word, topn=5):
    word = preprocess_word(word)
    try:
        similar = model.most_similar(word, topn=topn)
        return [w for w, score in similar]
    except KeyError:
        return ["I don't know that word!"]

