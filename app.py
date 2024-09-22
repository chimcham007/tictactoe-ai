from flask import Flask, render_template, jsonify, request
from urllib.parse import quote as url_quote

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-ai-move', methods=['POST'])
def get_ai_move():
    data = request.json
    board_state = data.get('board')
    difficulty = data.get('difficulty')
    
    ai_move = calculate_ai_move(board_state, difficulty)
    
    return jsonify({'move': ai_move})

def calculate_ai_move(board, difficulty):
    available_moves = [i for i, cell in enumerate(board) if cell == '_']
    if difficulty == 'easy':
        return available_moves[0]
    elif difficulty == 'medium':
        return available_moves[len(available_moves) // 2]
    elif difficulty == 'hard':
        return available_moves[-1]
    return available_moves[0]

if __name__ == '__main__':
    app.run(debug=True)
