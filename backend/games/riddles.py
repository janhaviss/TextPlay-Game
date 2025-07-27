import random
from sentence_transformers import SentenceTransformer, util
from datasets import load_dataset

# Load the dataset from Hugging Face
dataset = load_dataset('HWGuncoverAI/riddles')

# Function to pick a random riddle
def pick_random_riddle():
    '''picking random riddle from the dataset'''
    return random.choice(dataset['train'])
print("Loading sentencetransformer")
model = SentenceTransformer('all-MiniLM-L6-v2')  # Lightweight and fast
print("Model loaded successfully")

# Function to evaluate the user's answer
def evaluate_answer(user_answer, correct_answer, threshold=0.7):
    ''' evaluating users answer with actual answer by AI to check similaritiy '''
    # Encode the sentences into embeddings
    user_embedding = model.encode(user_answer, convert_to_tensor=True)
    correct_embedding = model.encode(correct_answer, convert_to_tensor=True)
    
    # Compute cosine similarity
    similarity = util.cos_sim(user_embedding, correct_embedding).item()
    
    # Check if the similarity is above the threshold
    return similarity >= threshold, similarity


# Function to get a new riddle
def get_new_riddle():
    riddle = pick_random_riddle()
    return riddle

# Function to check the user's answer
def check_answer(user_answer, correct_answer):
    return evaluate_answer(user_answer, correct_answer)


# Sample riddle dataset
# riddle_dataset = [
#     {
#         "query": "What can fill a room but takes up no space?",
#         "hint": "It brightens the surroundings.",
#         "answer": "light"
#     },
#     {
#         "query": "What has keys but can't open locks?",
#         "hint": "Think about music.",
#         "answer": "piano"
#     },
#     {
#         "query": "What has a heart that doesn't beat?",
#         "hint": "Found in playing cards.",
#         "answer": "artichoke"
#     }
# ]

# # Function to pick a random riddle
# def pick_random_riddle():
#     return random.choice(riddle_dataset)