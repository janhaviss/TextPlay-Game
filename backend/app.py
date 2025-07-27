from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
from games.word_association import get_associated_words, preprocess_word
from games.story_generation import generate_story
from games.riddles import pick_random_riddle, evaluate_answer
import json
import random
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)


app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WORD_BANK_PATH = os.path.join(BASE_DIR, 'datasets', 'word_bank.json')


with open(WORD_BANK_PATH, 'r', encoding='utf-8') as f:
    word_bank = json.load(f)


# Main Page Route
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/associate/get_clues", methods=["GET"])
def get_clues():
    target = random.choice(word_bank)
    session["target_word"] = target  # Save target word in session
    clues = get_associated_words(target, topn=5)[:3]
    return jsonify({"clues": clues})

@app.route("/api/associate/check_guess", methods=["POST"])
def check_guess():
    user_guess = request.json.get("guess")
    target_word = session.get("target_word")
    print(target_word)

    if not target_word:
        return jsonify({"error": "No active round. Please start a new game."}), 400

    is_correct = preprocess_word(user_guess) == preprocess_word(target_word)

    return jsonify({
        "correct": is_correct,
        "target": target_word if not is_correct else None,
        "message": "Correct!" if is_correct else f"Incorrect! The correct word was '{target_word}'"
    })



# Generate Story
@app.route("/api/generate_story",  methods=["GET", "POST"])
def generate_story_route():
    user_input = request.json.get("prompt")
    story = generate_story(user_input)
    return jsonify({"story": story})




## Riddles ##
@app.route("/api/riddles/riddles", methods=["GET", "POST"])
def check_answer():
    user_answer = request.json.get("answer")
    riddle = session.get("riddle")
    
    if not riddle:
        return jsonify({
            "status": "error",
            "message": "No riddle found. Start a new game."
        }), 400
    
    correct_answer = riddle["label"]
    is_correct, similarity = evaluate_answer(user_answer, correct_answer)
    
    return jsonify({
        "status": "success",
        "is_correct": is_correct,
        "similarity": similarity,
        "correct_answer": correct_answer
    })

# New riddle route
@app.route("/api/riddles/new", methods=["GET"])
def new_riddle():
    riddle = pick_random_riddle()
    session["riddle"] = riddle
    return jsonify({
        "status": "success",
        "riddle": riddle["query"],
        "hint": riddle["hint"]
    })

@app.route("/api/riddles/hint")
def get_hint():
    riddle = session.get("riddle")  # Get the current riddle from the session
    if not riddle:
        return jsonify({
            "status": "error",
            "message": "No riddle found. Start a new game."
        }), 400
    
    return jsonify({
        "status": "success",
        "hint": riddle["hint"]  # Return the hint for the current riddle
    })

@app.route("/api/riddles/ask-ai")
def get_answer():
    riddle = session.get("riddle")  # Get the current riddle from the session
    if not riddle:
        return jsonify({
            "status": "error",
            "message": "No riddle found. Start a new game."
        }), 400
    
    return jsonify({
        "status": "success",
        "answer": riddle["label"]  # Return the answer for the current riddle
    })

# Main 
if __name__ == "__main__":
    app.run(debug=True)